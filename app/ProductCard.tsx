'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from './products';
import { useCart } from './context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
      {/* Image Container with Overlay */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full border border-gray-200">
            {product.category}
          </span>
        </div>
        {/* Brand Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {product.brand}
          </span>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price and Button Container */}
        <div className="flex flex-col items-start gap-y-5 justify-between mt-auto w-full">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              NPR {product.price.toLocaleString('en-NP')}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Inclusive of all taxes
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h9l-1.5-6"
              />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;