# 🛒 Shopping Cart with Khalti Payment Integration

A modern, responsive e-commerce shopping cart application built with Next.js 15 and integrated with Khalti Payment Gateway for seamless online payments in Nepal.

## ✨ Features

- **Modern UI/UX**: Beautiful product cards with smooth animations and hover effects
- **Shopping Cart**: Add, remove, and update product quantities
- **Persistent Cart**: Cart state saved in localStorage across sessions
- **Khalti Payment**: Secure payment processing with Khalti Payment Gateway
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Dynamic cart updates and price calculations
- **Sticky Navigation**: Always accessible cart and navigation
- **NPR Currency**: All prices displayed in Nepalese Rupees

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API with useReducer
- **Payment Gateway**: Khalti Payment API
- **Image Optimization**: Next.js Image component with Unsplash
- **Development**: Turbopack for fast development

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudip15622/Khalti-Payment.git
   cd Khalti-Payment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_KHALTI_SECRET_KEY=your_khalti_secret_key_here
   NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
   ```

   For testing, you can use Khalti's test credentials:
   ```env
   NEXT_PUBLIC_KHALTI_SECRET_KEY=test_secret_key_f59e8b7d18b4499bb4b8436cf6179ca4
   NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── payment/
│   │       └── route.ts          # Payment verification API
│   ├── components/
│   │   ├── Header.tsx            # Sticky navigation header
│   │   └── CartSidebar.tsx       # Sliding cart sidebar
│   ├── context/
│   │   └── CartContext.tsx       # Global cart state management
│   ├── payment/
│   │   └── page.tsx              # Payment form page
│   ├── payment-success/
│   │   └── page.tsx              # Payment success page
│   ├── payment-failed/
│   │   └── page.tsx              # Payment failure page
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Homepage with product grid
│   ├── ProductCard.tsx           # Product card component
│   └── products.ts               # Product data and interfaces
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Project dependencies
```

## 🛍️ Usage

### Adding Products to Cart
1. Browse the product grid on the homepage
2. Click "Add to Cart" on any product
3. View cart items in the sliding sidebar (click cart icon)

### Managing Cart Items
- **Increase quantity**: Click the "+" button
- **Decrease quantity**: Click the "-" button
- **Remove item**: Click the trash icon
- **Clear cart**: Use the "Clear Cart" button

### Making a Payment
1. Click "Pay Now" in the cart sidebar
2. Fill in your shipping information
3. Click "Pay with Khalti"
4. Complete payment on Khalti's secure platform
5. Get redirected to success/failure page

## 🔧 Configuration

### Khalti Setup
1. Sign up at [Khalti](https://khalti.com/)
2. Get your API credentials from the dashboard
3. Update the `.env.local` file with your keys
4. For production, use live keys instead of test keys

### Adding New Products
Edit `app/products.ts` to add new products:

```typescript
{
  id: 9,
  name: "Product Name",
  brand: "Brand Name",
  price: 25000, // Price in NPR
  image: "https://images.unsplash.com/photo-id",
  description: "Product description",
  category: "Category"
}
```

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.ts` for theme customization
- Edit component files for specific styling changes

### Cart Behavior
- Adjust cart logic in `app/context/CartContext.tsx`
- Modify localStorage keys and structure as needed
- Update tax rates and shipping costs in `app/payment/page.tsx`

## 🔒 Security

- Environment variables are used for sensitive data
- Payment processing handled by Khalti's secure servers
- No sensitive payment data stored locally
- HTTPS required for production deployment

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## 🧪 Testing

### Test Payment
Use Khalti's test credentials to simulate payments:
- **Test Phone**: 9800000000
- **Test MPIN**: 1111
- **Test OTP**: 987654

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Khalti](https://khalti.com/) for payment gateway services
- [Unsplash](https://unsplash.com/) for product images
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework

## 📞 Support

For support, email sudip15622@example.com or create an issue in this repository.

## 🔗 Links

- [Khalti Documentation](https://docs.khalti.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Made with ❤️ in Nepal** 🇳🇵
