'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  const txnId = searchParams.get('txnId');
  const amount = searchParams.get('amount');
  const pidx = searchParams.get('pidx');

  useEffect(() => {
    // Clear the cart on successful payment only once
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true;
    }
  }, []); // Empty dependency array - only run once on mount

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your order has been confirmed and payment processed successfully.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
          <div className="space-y-2">
            {txnId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium text-gray-900">{txnId}</span>
              </div>
            )}
            {amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-medium text-gray-900">NPR {(parseInt(amount) / 100).toLocaleString('en-NP')}</span>
              </div>
            )}
            {pidx && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-medium text-gray-900 text-xs">{pidx}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">Completed</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleContinueShopping}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue Shopping
          </button>
          <p className="text-center text-sm text-gray-600">
            You will receive an email confirmation shortly.
          </p>
        </div>
      </div>
    </div>
  );
}
