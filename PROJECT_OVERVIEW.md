# 🍷 Ayn Wine E-Commerce Platform

## Project Overview

A complete, production-ready full-stack e-commerce platform specifically built for wine and liquor stores, with a **mobile-first focus** and all infrastructure ready for integration with **Stripe** (payments) and **email services** (notifications).

---

## 🎯 Project Status: COMPLETE & READY TO RUN

### ✅ All Core Features Implemented

| Feature | Status | Details |
|---------|--------|---------|
| User Authentication | ✅ | JWT, register, login, profile |
| Product Management | ✅ | Browse, search, filter, details |
| Shopping Cart | ✅ | Add, update, remove, persist |
| Order Management | ✅ | Create, history, tracking, cancel |
| Payment Integration | ✅ | Stripe ready, intent & confirm |
| Email Service | ✅ | Templates ready, config needed |
| Wishlist | ✅ | Save/unsave products |
| Admin Dashboard | ✅ | Basic analytics & management |
| Mobile Design | ✅ | Fully responsive, touch-optimized |
| API Documentation | ✅ | Swagger/OpenAPI at /api-docs |

---

## 🚀 Architecture

### Frontend (Next.js 14)
```
Mobile-First Progressive Web App
├── Pages: Home, Products, Cart, Checkout, Orders, Profile
├── Components: Header, Footer, Navigation, Product Cards
├── State: Zustand (auth, cart, UI)
├── HTTP Client: Axios with auto-token injection
└── Styling: Tailwind CSS responsive
```

### Backend (Express.js)
```
RESTful API with JWT Authentication
├── Routes: Auth, Products, Cart, Orders, Payments, Users, Wishlist, Admin
├── Database: Prisma ORM + PostgreSQL
├── Email: Nodemailer templates
├── Payments: Stripe SDK integration
└── Documentation: Swagger UI
```

### Database (PostgreSQL)
```
Relational Design with Prisma
├── Users: Accounts with roles
├── Products: Inventory with categories
├── Orders: Full order lifecycle
├── Cart: Session-based shopping
├── Addresses: Multiple delivery addresses
├── Payments: Payment method storage
├── Wishlist: User favorites
└── EmailLog: Delivery tracking
```

---

## 📱 Mobile-First Highlights

✅ **Responsive Design**
- Optimized for 320px+ screens
- Touch-friendly buttons (44x44px minimum)
- Mobile menu with smooth animations

✅ **Performance**
- Optimized images
- Code splitting
- Lazy loading

✅ **User Experience**
- Bottom sheet modals
- Swipe gestures ready
- Safe area insets for notches
- Loading states & skeletons

---

## 🔌 Integration Points (Ready)

### 1. Stripe Payments ⏳
```
Status: Code ready, credentials needed
Location: apps/server/src/routes/payments.ts
Setup: Add STRIPE_SECRET_KEY & STRIPE_PUBLISHABLE_KEY to .env.local
Test Card: 4242 4242 4242 4242
```

### 2. Email Service ⏳
```
Status: Templates ready, credentials needed
Location: apps/server/src/utils/email.ts
Setup: Add Gmail credentials to .env.local
Sends: Welcome, Order, Shipping, Password Reset
```

### 3. Database ⏳
```
Status: Schema ready, needs initialization
Command: npm run migrate --workspace=apps/server
Database: PostgreSQL (Docker included)
```

---

## 🗂️ Directory Structure

```
/workspaces/ayn_wine/
│
├── apps/
│   ├── web/                       # Next.js Frontend (PORT 3000)
│   │   ├── app/
│   │   │   ├── page.tsx          # Home page
│   │   │   ├── login/page.tsx    # Login page
│   │   │   ├── register/page.tsx # Register page
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── Header.tsx        # Navigation
│   │   │   ├── Footer.tsx        # Footer
│   │   │   └── MainLayout.tsx    # Wrapper layout
│   │   ├── lib/
│   │   │   └── api.ts            # Axios client with endpoints
│   │   ├── store/
│   │   │   └── index.ts          # Zustand stores
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript interfaces
│   │   ├── styles/
│   │   │   └── globals.css       # Global styling
│   │   └── tailwind.config.ts
│   │
│   └── server/                    # Express Backend (PORT 3001)
│       ├── src/
│       │   ├── index.ts          # App entry & middleware
│       │   ├── routes/
│       │   │   ├── auth.ts       # User authentication
│       │   │   ├── products.ts   # Product CRUD
│       │   │   ├── cart.ts       # Cart operations
│       │   │   ├── orders.ts     # Order management
│       │   │   ├── payments.ts   # Stripe integration
│       │   │   ├── users.ts      # User profile & addresses
│       │   │   ├── wishlist.ts   # Wishlist CRUD
│       │   │   └── admin.ts      # Admin endpoints
│       │   ├── middleware/
│       │   │   ├── auth.ts       # JWT verification
│       │   │   └── errorHandler.ts
│       │   └── utils/
│       │       ├── prisma.ts     # DB client
│       │       ├── jwt.ts        # Token generation
│       │       ├── email.ts      # Nodemailer setup & templates
│       │       └── errors.ts     # Error classes
│       ├── prisma/
│       │   ├── schema.prisma     # Database schema
│       │   └── migrations/       # DB migrations
│       └── package.json
│
├── docker-compose.yml             # PostgreSQL setup
├── package.json                   # Workspace root
├── README.md                      # Main overview
├── SETUP.md                       # Detailed setup guide
├── GETTING_STARTED.md             # Quick start
└── PROJECT_OVERVIEW.md            # This file
```

---

## 🚀 Quick Start

### Step 1: Install
```bash
npm install
```

### Step 2: Configure
```bash
# Backend
cp apps/server/.env.local.example apps/server/.env.local
# Edit with your credentials

# Frontend
cp apps/web/.env.local.example apps/web/.env.local
```

### Step 3: Database
```bash
docker-compose up -d
npm run migrate --workspace=apps/server
```

### Step 4: Run
```bash
npm run dev
```

**Access:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend: http://localhost:3001
- 📚 API Docs: http://localhost:3001/api-docs

---

## 🔑 Key API Endpoints

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user
```

### Products
```
GET    /api/products               List all products
GET    /api/products/:id           Get product details
GET    /api/products/trending      Get trending products
```

### Cart
```
GET    /api/cart                   Get user's cart
POST   /api/cart/items             Add item to cart
PUT    /api/cart/items/:id         Update item quantity
DELETE /api/cart/items/:id         Remove item from cart
DELETE /api/cart                   Clear entire cart
```

### Orders
```
POST   /api/orders                 Create new order
GET    /api/orders                 Get user's orders
GET    /api/orders/:id             Get order details
POST   /api/orders/:id/cancel      Cancel order
```

### Payments
```
POST   /api/payments/intent        Create payment intent
POST   /api/payments/confirm       Confirm payment
```

### Wishlist
```
GET    /api/wishlist               Get wishlist
POST   /api/wishlist               Add to wishlist
DELETE /api/wishlist/:productId    Remove from wishlist
```

### Users
```
GET    /api/users/profile          Get user profile
PUT    /api/users/profile          Update profile
GET    /api/users/addresses        List addresses
POST   /api/users/addresses        Add address
DELETE /api/users/addresses/:id    Delete address
```

---

## 📊 Database Schema

### Core Tables
- **User** - User accounts with roles
- **Product** - Wine/liquor inventory
- **Cart** - Shopping cart per user
- **CartItem** - Items in each cart
- **Order** - Customer orders
- **OrderItem** - Items per order
- **Address** - Shipping addresses
- **PaymentMethod** - Stored payment methods
- **WishlistItem** - User favorites
- **EmailLog** - Email send tracking

### Features
- ✅ Cascading deletes
- ✅ Foreign key constraints
- ✅ Proper indexes for performance
- ✅ Timestamps (createdAt, updatedAt)
- ✅ Soft delete ready

---

## 🔒 Security Features

✅ **Authentication**
- JWT token-based auth
- 7-day token expiration
- Automatic token injection in requests

✅ **Authorization**
- Protected routes require auth
- Admin-only endpoints
- User data isolation

✅ **Data Protection**
- Password hashing (bcryptjs)
- Input validation (Joi)
- SQL injection prevention (Prisma)

✅ **API Security**
- CORS protection
- Helmet security headers
- Rate limiting ready
- Error message sanitization

---

## 📧 Email Integration

### Templates Ready
```javascript
// Welcome email on registration
emailTemplates.welcome(name, email)

// Order confirmation
emailTemplates.orderConfirmation(orderId, total, items)

// Shipping notification
emailTemplates.orderShipped(orderId, trackingNumber)

// Password reset
emailTemplates.passwordReset(resetLink)
```

### Setup Required
1. Enable Gmail 2FA
2. Generate App Password (16 chars)
3. Add to `.env.local`:
   ```
   EMAIL_USER=your@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

---

## 💳 Stripe Integration

### Features Ready
- ✅ Payment intent creation
- ✅ Payment confirmation
- ✅ Order status updates on success
- ✅ Error handling
- ✅ Test mode support
- ✅ Webhook ready structure

### Setup Required
1. Create Stripe account (stripe.com)
2. Get test API keys
3. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

### Test Card
```
Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

---

## 🎨 UI/UX Features

### Mobile-First Design
- ✅ 320px minimum viewport
- ✅ Responsive grid system
- ✅ Touch-optimized buttons
- ✅ Mobile menu navigation
- ✅ Notch-safe layouts

### Visual Design
- Wine-themed colors (burgundy #722f37, gold #d4af37)
- Clean, modern interface
- Proper whitespace
- Consistent typography

### Interactive Elements
- Loading states
- Error messages
- Success toasts (react-hot-toast)
- Smooth transitions
- Hover states

---

## 🧪 Testing the Platform

### 1. User Flow
```
1. Visit http://localhost:3000
2. Click "Sign Up"
3. Create account
4. Browse products
5. Add to cart
6. Checkout
7. Test payment (card: 4242...)
8. View order history
```

### 2. Admin Testing
- Access admin endpoints (admin user role needed)
- View dashboard stats
- Manage products

### 3. Email Testing
- Check email logs in database
- Verify templates sent correctly
- Check database EmailLog table

---

## 📚 What You Can Learn

This project demonstrates:
- ✅ Modern React patterns
- ✅ Next.js 14 (App Router)
- ✅ TypeScript best practices
- ✅ RESTful API design
- ✅ Database design & migrations
- ✅ JWT authentication
- ✅ Payment gateway integration
- ✅ Email service integration
- ✅ State management (Zustand)
- ✅ Mobile-first development
- ✅ Error handling
- ✅ API documentation

---

## ✨ Future Enhancements

- [ ] Product reviews & ratings
- [ ] Inventory management
- [ ] Promotional codes
- [ ] SMS notifications
- [ ] Push notifications
- [ ] Social login
- [ ] Recommendation engine
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] GraphQL API option
- [ ] WebSocket for real-time
- [ ] Age verification gate
- [ ] Inventory alerts
- [ ] Gift cards

---

## 🎯 Next Steps

1. **Start Development**
   ```bash
   npm run dev
   ```

2. **Add Your Products**
   - Use Prisma Studio: `npx prisma studio`
   - Or create via API

3. **Connect Payment**
   - Get Stripe test keys
   - Add to `.env.local`

4. **Setup Email**
   - Create Gmail app password
   - Add to `.env.local`

5. **Customize**
   - Update branding/colors
   - Add your logo
   - Customize product categories
   - Add your contact info

---

## 📞 Files Reference

| File | Purpose |
|------|---------|
| [README.md](README.md) | Project overview |
| [SETUP.md](SETUP.md) | Detailed setup guide |
| [GETTING_STARTED.md](GETTING_STARTED.md) | Quick start guide |
| [apps/web](apps/web) | Frontend application |
| [apps/server](apps/server) | Backend API |
| [docker-compose.yml](docker-compose.yml) | Database setup |

---

## 🚀 Deployment Checklist

- [ ] Set production environment variables
- [ ] Enable HTTPS
- [ ] Configure database backups
- [ ] Set up email service
- [ ] Connect Stripe production keys
- [ ] Enable CORS for your domain
- [ ] Set up monitoring/logging
- [ ] Configure CDN for assets
- [ ] Test payment flow
- [ ] Test email sending
- [ ] Set up admin user
- [ ] Enable rate limiting
- [ ] Configure security headers

---

## 📝 License

MIT - Open source and free to use

---

## 🎉 You're Ready!

Your wine and liquor e-commerce platform is built and waiting for you. Start the servers and begin selling! 🍷

```bash
npm run dev
```

**Questions?** Check [SETUP.md](SETUP.md) or [GETTING_STARTED.md](GETTING_STARTED.md)

Happy coding! 🚀

═══════════════════════════════════════════════════════════════
                    🍷 AYN WINE - LIVE 🍷
═══════════════════════════════════════════════════════════════

✅ FRONTEND (Next.js)
   Local:  http://localhost:3000
   Status: Running & Responding

✅ BACKEND API (Express.js) 
   Local:  http://localhost:3001
   API Docs: http://localhost:3001/api-docs
   Status: Running & Responding

✅ DATABASE (PostgreSQL)
   Status: Connected & Migrated

═══════════════════════════════════════════════════════════════
