'use client';

import React from 'react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { toggleCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">ShopCart</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Products</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
            >
              <span className="sr-only">Open cart</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h9l-1.5-6"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
