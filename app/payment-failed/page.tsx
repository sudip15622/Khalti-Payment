'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentFailed() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get('status');
  const pidx = searchParams.get('pidx');

  const handleRetryPayment = () => {
    router.push('/payment');
  };

  const handleBackToCart = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We couldn't process your payment. Please try again.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Error Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-red-600">{status || 'Failed'}</span>
            </div>
            {pidx && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-medium text-gray-900 text-xs">{pidx}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRetryPayment}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retry Payment
          </button>
          <button
            onClick={handleBackToCart}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Shopping
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            If you continue to experience issues, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
