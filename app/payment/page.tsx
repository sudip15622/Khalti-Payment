"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function PaymentPage() {
  const router = useRouter();
  const { state, getTotalPrice } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 ? 1200 : 0; // NPR 1319 (approx $10)
  const tax = subtotal * 0.13; // 13% VAT in Nepal
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form data
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (state.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      // Convert amount to paisa (Khalti requires amount in paisa, not rupees)
      const amountInPaisa = Math.round(total * 100);

      const payload = {
        return_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/payment`,
        website_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
        amount: amountInPaisa, // Amount in paisa
        purchase_order_id: uuidv4(),
        purchase_order_name: `Order from ${formData.firstName} ${formData.lastName}`,
        customer_info: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone
        },
        amount_breakdown: [
          {
            label: "Mark Price",
            amount: Math.round(subtotal * 100)
          },
          {
            label: "VAT",
            amount: Math.round(tax * 100)
          },
          {
            label: "Shipping",
            amount: Math.round(shipping * 100)
          }
        ],
        product_details: state.items.map(item => ({
          identity: item.id.toString(),
          name: item.name,
          total_price: Math.round(item.price * item.quantity * 100),
          quantity: item.quantity,
          unit_price: Math.round(item.price * 100)
        }))
      };

      const options = {
        method: "POST",
        headers: {
          Authorization: `key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };

      console.log("Initiating Khalti payment with payload:", payload);

      const khaltiResponse = await fetch(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        options
      );

      if (!khaltiResponse.ok) {
        throw new Error(`HTTP error! status: ${khaltiResponse.status}`);
      }

      const khaltiData = await khaltiResponse.json();
      console.log("Khalti response:", khaltiData);

      if (khaltiData.error_key) {
        console.error("Khalti error:", khaltiData.detail);
        alert(`Payment initiation failed: ${khaltiData.detail}`);
        return;
      }

      if (!khaltiData.pidx || !khaltiData.payment_url) {
        console.error("Invalid response from Khalti:", khaltiData);
        alert("Failed to initiate payment. Please try again.");
        return;
      }

      // Redirect to Khalti payment page
      window.location.href = khaltiData.payment_url;

    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing payment. Please try again.");
    }
  };

  const handleBackToCart = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={handleBackToCart}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 cursor-pointer"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Shopping
          </button>
          <h1 className="text-3xl font-bold text-black">Checkout</h1>
          <p className="text-gray-600 mt-2">
            Complete your purchase with Khalti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-black mb-6">
              Shipping Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-black mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-black mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-black mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-medium text-black mb-4">
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-black mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                        placeholder="Kathmandu"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-black mb-1"
                      >
                        Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                        placeholder="Bagmati"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block text-sm font-medium text-black mb-1"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-500"
                        placeholder="44600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 cursor-pointer flex items-center justify-center gap-3"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">K</span>
                </div>
                Pay via Khalti
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-black mb-6">
              Order Summary
            </h2>

            {/* Real Cart Items */}
            <div className="space-y-4 mb-6">
              {state.items.length === 0 ? (
                <p className="text-gray-500 text-center">No items in cart</p>
              ) : (
                state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 pb-4 border-b"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-black truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium text-black">
                      NPR {(item.price * item.quantity).toLocaleString("en-NP")}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Pricing Breakdown */}
            {state.items.length > 0 && (
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-black">
                    NPR {subtotal.toLocaleString("en-NP")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-black">
                    NPR {shipping.toLocaleString("en-NP")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (13%)</span>
                  <span className="text-black">
                    NPR {tax.toLocaleString("en-NP")}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-black">Total</span>
                    <span className="text-black">
                      NPR {total.toLocaleString("en-NP")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Security Badge */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">
                  Your payment is secure with Khalti
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
