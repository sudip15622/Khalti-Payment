export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    brand: "Apple",
    price: 131999, // NPR price
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    description: "Latest iPhone with titanium design and A17 Pro chip",
    category: "Electronics"
  },
  {
    id: 2,
    name: "MacBook Air M3",
    brand: "Apple",
    price: 171599, // NPR price
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
    description: "13-inch MacBook Air with M3 chip",
    category: "Electronics"
  },
  {
    id: 3,
    name: "AirPods Pro",
    brand: "Apple",
    price: 32999, // NPR price
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
    description: "Wireless earbuds with active noise cancellation",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Nike Air Max",
    brand: "Nike",
    price: 17159, // NPR price
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    description: "Comfortable running shoes with air cushioning",
    category: "Footwear"
  },
  {
    id: 5,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    price: 105599, // NPR price
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop",
    description: "Android smartphone with AI features",
    category: "Electronics"
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 52799, // NPR price
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    description: "Premium wireless noise-canceling headphones",
    category: "Electronics"
  },
  {
    id: 7,
    name: "Adidas Ultraboost",
    brand: "Adidas",
    price: 23759, // NPR price
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop",
    description: "High-performance running shoes with boost technology",
    category: "Footwear"
  },
  {
    id: 8,
    name: "iPad Pro 12.9",
    brand: "Apple",
    price: 145199, // NPR price
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop",
    description: "Professional tablet with M2 chip and Liquid Retina display",
    category: "Electronics"
  }
];