# Ayn Wine - Full-Stack E-Commerce Platform

A modern, mobile-first e-commerce platform for wine and liquor sales built with Next.js, Express.js, and PostgreSQL.

## 🎯 Key Features

### Customer Features
- 📱 **Mobile-First Design** - Optimized for all devices
- 🔐 **User Authentication** - Secure JWT-based login/registration
- 🛍️ **Product Catalog** - Browse with search and filtering
- 🛒 **Shopping Cart** - Real-time cart management
- 💳 **Stripe Payments** - Secure payment processing
- 📧 **Email Notifications** - Order confirmations, shipping updates
- 📜 **Order History** - Track all purchases
- ❤️ **Wishlist** - Save favorite products
- 📍 **Address Management** - Multiple shipping addresses

### Admin Features
- 📊 **Dashboard** - Sales analytics and metrics
- 📦 **Product Management** - Create, update, delete products
- 📋 **Order Management** - View and manage all orders

## 🚀 Tech Stack

### Frontend
- Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query, Stripe

### Backend
- Express.js, TypeScript, Prisma, PostgreSQL, JWT, Stripe SDK, Nodemailer

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL 14+ (or Docker)
- Stripe account (get free test keys)
- Gmail account (for email service)

## 🛠️ Quick Start

### 1. Install
```bash
npm install
```

### 2. Environment Setup
```bash
# Backend
cp apps/server/.env.local.example apps/server/.env.local
# Edit with your keys: DATABASE_URL, JWT_SECRET, STRIPE_*, EMAIL_*

# Frontend  
cp apps/web/.env.local.example apps/web/.env.local
# Edit with: NEXT_PUBLIC_API_URL, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### 3. Database
```bash
# Start PostgreSQL
docker-compose up -d

# Run migrations
npm run migrate --workspace=apps/server
```

### 4. Development
```bash
npm run dev
```

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

## 🔑 Key API Routes

**Auth:**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

**Products:**
- GET /api/products
- GET /api/products/:id

**Cart:**
- GET /api/cart
- POST /api/cart/items
- DELETE /api/cart/items/:id

**Orders:**
- POST /api/orders
- GET /api/orders
- GET /api/orders/:id

**Payments:**
- POST /api/payments/intent
- POST /api/payments/confirm

## 🧪 Stripe Test Card

- Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

## 📦 What's Included

✅ User authentication (JWT)
✅ Product search & filtering
✅ Shopping cart
✅ Stripe payment integration
✅ Email notifications (welcome, order, shipping)
✅ Order history & tracking
✅ Wishlist
✅ Admin dashboard
✅ Mobile-first responsive design
✅ API documentation (Swagger)
✅ Dark mode ready
✅ TypeScript throughout

## 📚 Full Documentation

See [SETUP.md](./SETUP.md) for:
- Detailed configuration instructions
- Stripe setup guide
- Email service setup
- Troubleshooting guide
- Deployment instructions
- Complete file structure

## 🚀 Build & Deploy

```bash
# Build both apps
npm run build

# Production start
npm start
```

Deploy frontend to Vercel, backend to Railway/Render/Heroku.

## 🐛 Quick Troubleshooting

**Database error?**
```bash
docker-compose down -v && docker-compose up -d
```

**Port in use?**
```bash
PORT=3002 npm run dev --workspace=apps/server
```

**Missing env vars?**
```bash
# Make sure you created and filled .env.local files
```

## 📝 License

MIT - Free for personal and commercial use

## 🆘 Need Help?

1. Read [SETUP.md](./SETUP.md)
2. Check API docs at http://localhost:3001/api-docs
3. Look at console errors
4. Check terminal logs

---

**Ready to launch?** Follow Quick Start above!