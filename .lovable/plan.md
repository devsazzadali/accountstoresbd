

# PlayerAuctions Clone - Full-Stack Gaming Marketplace

## Overview
A pixel-perfect clone of the PlayerAuctions storefront with a dark gaming aesthetic, complete with seller admin tools, user accounts, and Stripe payment processing.

---

## Phase 1: Foundation & Visual Design

### 1.1 Design System Setup
- Configure the exact color palette: dark backgrounds (#05070a, #0d1117), borders (#21262d), green action buttons (#2ea043), gold accents (#f0ad4e)
- Set up Inter font with proper weights
- Create reusable UI components matching PlayerAuctions styling

### 1.2 Core Layout Components
- **Global Header**: Dark navigation bar with logo, search input, and auth buttons
- **Seller Banner**: High-contrast red/dark banner with "20000+ SALES", "24/7 SUPPORT", "10+ YEARS" text
- **Storefront Header**: Statistics card with seller avatar, sales volume, feedback %, and member since date

---

## Phase 2: Authentication System

### 2.1 User Authentication
- Login and signup pages with email/password
- User profile management (avatar, display name)
- Protected routes for user dashboard

### 2.2 Admin Authorization
- Role-based access control (admin vs customer)
- Secure admin detection using database roles
- Protected admin routes

---

## Phase 3: Database & Data Models

### 3.1 Core Tables
- **profiles**: User information (avatar, display name, role)
- **user_roles**: Separate role storage (admin, customer)
- **games**: List of supported games
- **categories**: Gold, Items, Accounts, Boosting, Skins
- **listings**: Products with title, game, category, price, stock, description
- **orders**: Purchase records with status tracking
- **reviews**: Customer feedback with ratings

### 3.2 Security
- Row Level Security policies for all tables
- Admin-only write access to listings
- Users can only view their own orders

---

## Phase 4: Storefront Features

### 4.1 Navigation Tabs
- Rounded icon buttons for each category (Gold, Items, Accounts, Boosting, Skins)
- Red "99+" badge showing listing counts
- Active state styling

### 4.2 Product Table
- Dark themed table with hover effects (#161b22)
- Columns: Product name, game, server/details, stock, price with vertical separator
- Green "BUY NOW" button on each row
- Skeleton loaders when data is loading
- Mobile responsive: switches to card-stack view

### 4.3 Search & Filtering
- Search by product name
- Filter by game and category
- Sort by price, newest, popularity

---

## Phase 5: Payment Integration

### 5.1 Stripe Setup
- Enable Stripe integration for the project
- Create products and prices in Stripe

### 5.2 Checkout Flow
- "Buy Now" opens a checkout modal/page
- Quantity selection
- Stripe Checkout session for secure payment
- Order confirmation and receipt

---

## Phase 6: User Dashboard (/dashboard)

### 6.1 My Purchases
- List of all purchased items
- Order status (Processing, Delivered, Refunded)
- Order details and delivery information

### 6.2 Profile Settings
- Update avatar (with Supabase Storage)
- Change display name
- View account statistics

---

## Phase 7: Admin Dashboard (/admin)

### 7.1 Inventory Management
- View all listings in a table
- Add new listings form: Title, Game, Category, Price, Stock, Description
- Edit existing listings
- Delete listings

### 7.2 Order Management
- View all orders from customers
- Filter by status
- Mark orders as "Delivered" or "Refunded"
- View customer details

### 7.3 Store Statistics
- Total sales count
- Revenue overview
- Recent orders

---

## Key Technical Decisions

- **React + Vite** (Lovable's stack) instead of Next.js - same functionality, different framework
- **React Query** for data fetching and caching
- **Supabase Auth** for user authentication
- **Supabase Database** with RLS for security
- **Supabase Storage** for avatars and product images
- **Stripe Checkout** for secure payments

---

## Deliverables

1. ✅ Pixel-perfect storefront matching PlayerAuctions visual design
2. ✅ Full authentication with user and admin roles
3. ✅ Product listing system with categories and filtering
4. ✅ Stripe-powered checkout flow
5. ✅ User dashboard for purchase history
6. ✅ Admin dashboard for inventory and order management
7. ✅ Mobile responsive design
8. ✅ Skeleton loaders for loading states

