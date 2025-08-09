# Caravan Transport Customer Portal

A modern Next.js customer portal for Caravan Transport LLC, providing customers with self-service capabilities for managing their vehicle shipments.

## Features

- 🔐 **Secure Authentication**: Email/password authentication with JWT tokens
- 📊 **Dashboard**: Overview of all shipments and account activity
- 📦 **Order Management**: View and track all shipments in real-time
- 💳 **Payment History**: Access invoices and payment records
- 📄 **Documents**: Download shipping documents and receipts
- 💰 **Quotes**: Request and manage shipping quotes
- ⭐ **Reviews**: Leave feedback on completed shipments
- 🎁 **Referral Program**: Earn rewards by referring friends
- 👤 **Profile Management**: Update account information

## Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Payments**: Stripe integration
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

3. Create `.env.local` file:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
STRIPE_SECRET_KEY="your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-public-key"
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

## Project Structure

```
/app
  /admin         - Admin dashboard pages
  /api          - API routes for authentication and data
  /auth         - Login and registration pages
  /dashboard    - Customer dashboard pages
/components     - Reusable React components
/lib           - Utility functions and configurations
/prisma        - Database schema and migrations
/public        - Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with test data

## Deployment

This portal is designed to be deployed on Vercel:

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

## Security

- Passwords are hashed using bcrypt
- JWT tokens for session management
- Protected routes with middleware
- Input validation with Zod
- SQL injection prevention with Prisma

## License

© 2024 Caravan Transport LLC. All rights reserved.