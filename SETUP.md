# Setup Guide - Ayn Wine E-Commerce Platform

## Quick Start

### 1. Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- PostgreSQL 14+ or Docker
- Git

### 2. Clone & Install

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm install --workspace=apps/web
npm install --workspace=apps/server
```

### 3. Database Setup

**Option A: Using Docker (Recommended)**
```bash
docker-compose up -d
# Wait for PostgreSQL to be ready
sleep 5
```

**Option B: Using Local PostgreSQL**
- Ensure PostgreSQL is running
- Create a database: `CREATE DATABASE ayn_wine;`

### 4. Environment Configuration

**Backend (.env.local)**
```bash
cp apps/server/.env.local.example apps/server/.env.local
# Edit with your actual values
```

**Frontend (.env.local)**
```bash
cp apps/web/.env.local.example apps/web/.env.local
```

### 5. Database Migrations

```bash
cd apps/server
npx prisma migrate dev --name init
# This creates all tables and seeds with sample data
cd ../..
```

### 6. Start Development

**Option A: Separate terminals**
```bash
# Terminal 1 - Frontend
npm run dev --workspace=apps/web

# Terminal 2 - Backend
npm run dev --workspace=apps/server
```

**Option B: Combined (from root)** *(may need to be split if having issues)*
```bash
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

## Configuration

### Stripe Setup

1. Create account at https://stripe.com
2. Get test API keys from Dashboard
3. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

**Test Card:**
- Number: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

### Email Setup (Gmail)

1. Enable 2-Factor Authentication
2. Generate [App Password](https://myaccount.google.com/apppasswords)
3. Add to `.env.local`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

### JWT Secret

Generate a secure 32+ character secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product detail
- `GET /api/products/trending` - Trending products

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/items` - Add to cart
- `PUT /api/cart/items/:productId` - Update quantity
- `DELETE /api/cart/items/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `POST /api/orders/:id/cancel` - Cancel order

### Payments
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

### Users
- `GET /api/users/profile` - Get profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/addresses` - List addresses
- `POST /api/users/addresses` - Add address
- `DELETE /api/users/addresses/:id` - Delete address

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

## File Structure

```
ayn_wine/
├── apps/
│   ├── web/                    # Next.js Frontend
│   │   ├── app/                # Pages and layouts
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities and API client
│   │   ├── store/              # Zustand state management
│   │   ├── types/              # TypeScript types
│   │   ├── styles/             # Global CSS
│   │   └── package.json
│   │
│   └── server/                 # Express.js Backend
│       ├── src/
│       │   ├── index.ts        # Entry point
│       │   ├── routes/         # API routes
│       │   ├── middleware/     # Express middleware
│       │   ├── utils/          # Utilities (JWT, email, etc)
│       │   └── prisma/         # Database schema
│       └── package.json
│
├── docker-compose.yml          # Database setup
├── package.json               # Root workspace config
└── README.md
```

## Development Commands

```bash
# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Type check
npm run type-check

# Run database migrations
npm run migrate --workspace=apps/server

# Database UI
npx prisma studio --workspace=apps/server
```

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
rm -rf node_modules package-lock.json
npm install
```

### Database connection failed
```bash
# Check PostgreSQL is running
docker-compose ps

# Restart database
docker-compose restart postgres

# Check DATABASE_URL format in .env.local
# Should be: postgresql://USER:PASS@HOST:PORT/DB
```

### Stripe errors
- Verify API keys in .env.local
- Check Stripe account is in test mode
- Try test card: 4242 4242 4242 4242

### Email not sending
- Verify Gmail 2FA is enabled
- Check App Password (16 chars)
- Try sending test email: `npm run test-email --workspace=apps/server`

## Features Implemented

✅ User authentication (JWT)
✅ Product catalog with search/filter
✅ Shopping cart
✅ Order management
✅ Stripe payment integration
✅ Email notifications
✅ Wishlist
✅ User profile & addresses
✅ Admin dashboard (basic)
✅ Mobile-first responsive design
✅ API documentation (Swagger)

## Next Steps / TODOs

- [ ] Add product reviews & ratings
- [ ] Implement inventory management
- [ ] Add promotional codes/discounts
- [ ] SMS notifications
- [ ] Push notifications
- [ ] Social login (Google, Facebook)
- [ ] Product recommendations
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)

## Deployment

### Frontend (Vercel)
```bash
npm run build --workspace=apps/web
```

### Backend (Railway, Render, Heroku)
```bash
npm run build --workspace=apps/server
```

Ensure environment variables are set in your hosting platform.

## Support

For issues or questions, check:
1. API Documentation: http://localhost:3001/api-docs
2. Console logs (browser and terminal)
3. Email logs in database: `prisma.emailLog.findMany()`

## License

MIT
