# TicketBari

## Project Name
**TicketBari** – Online Ticket Booking Platform

## Purpose
TicketBari is a full-stack web application for booking tickets online. It allows users to browse available tickets, book them, and make secure payments via Stripe. Vendors can create and manage tickets, and admins have full control over users, vendors, and ticket verification.  

## Live URL
ticket-bari-b12-a11.netlify.app
## Key Features

### User Features
- User registration and login with email/password and Google OAuth.
- View available tickets and book tickets.
- Secure payment via Stripe checkout.
- View booking history and payment status.
- Update profile information (name, email, profile picture).

### Vendor Features
- Create, update, and delete tickets.
- View bookings for own tickets.
- Track total revenue and tickets sold.
- Dashboard for ticket and booking management.
- Only verified vendors can advertise tickets.

### Admin Features
- View all users in a table format.
- Make a user **Admin** or **Vendor** with a single click.
- Mark vendors as **Fraud**; hides all their tickets and cancels related bookings.
- Approve or reject tickets posted by vendors.
- Dashboard analytics for tickets and users.

### Payment & Security
- Stripe payment integration with secure checkout.
- Prevent duplicate payments.
- Booking quantity is automatically reduced after successful payment.
- Protected routes for Admin, Vendor, and User.
- Role-based access control for dashboard features.

### Other Features
- Fully responsive design using **DaisyUI** and **TailwindCSS**.
- Smooth image sliders and carousels using **SwiperJS**.
- State management and data fetching using **TanStack Query**.
- MongoDB aggregation for complex queries like revenue and booked tickets.

## Tech Stack
- **Frontend:** React, DaisyUI, TailwindCSS, SwiperJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth (Email/Password + Google OAuth)
- **Payment:** Stripe Checkout
- **State Management & Data Fetching:** TanStack Query
- **Security:** Role-based route protection, secure API endpoints

## NPM Packages Used
- `react` – Frontend library
- `react-dom` – Rendering UI components
- `react-router-dom` – Routing
- `react-hook-form` – Form handling
- `@tanstack/react-query` – Data fetching and caching
- `axios` – API calls
- `daisyui` – UI components
- `tailwindcss` – Styling
- `swiper` – Image sliders/carousels
- `firebase` – Authentication
- `stripe` – Payment integration
- `cors` – Cross-Origin Resource Sharing
- `mongodb` – Database connection

