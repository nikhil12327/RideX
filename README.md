# RideX

**RideX** is a full-stack bike taxi booking platform built with three dedicated web applications for **Customers, Riders, and Administrators**. The platform uses Firebase and real-time Firestore services to manage rides, users, rider operations, payments, live tracking, and platform analytics.

## 🎥 Project Demo

### Customer App
[▶ Watch Customer App Demo](YOUR_VIDEO_LINK)

### Rider App
[▶ Watch Rider App Demo](YOUR_VIDEO_LINK)

### Admin Dashboard
[▶ Watch Admin Dashboard Demo](YOUR_VIDEO_LINK)

### Complete Project Demo
[▶ Watch Full RideX Demo]([YOUR_VIDEO_LINK](https://youtu.be/NstOJvBgg3Q))

## Overview

RideX provides an end-to-end ride-booking workflow:

**Customer books a ride → Rider accepts → Live tracking → Ride completion → Wallet payment → Admin analytics**

The system is designed with separate portals so each user type has a focused experience while sharing the same Firebase backend.

## Applications

### Customer App
- User authentication and profile management
- Pickup and drop location autocomplete
- Current-location detection
- Route visualization on an interactive map
- Distance-based fare calculation
- Ride booking and cancellation
- Real-time rider location tracking
- Rider details after ride acceptance
- Wallet recharge and ride payment
- Ride history
- Reviews and ratings
- Responsive mobile-friendly interface

### Rider App
- Rider authentication and profile
- Online/offline availability
- Real-time ride request notifications
- Accept/reject ride requests
- Active ride lifecycle:
  `Accepted → Arrived → Started → Completed`
- Live location sharing
- Rider earnings tracking
- Earnings and completed-ride statistics
- Ride history
- Profile and logout management

### Admin App
- Admin authentication
- Platform overview dashboard
- Customer and rider statistics
- Active/completed ride monitoring
- Revenue and KPI cards
- Date-based revenue and ride analytics
- Ride status distribution
- Top rider statistics
- Real-time activity feed
- Rider approval and suspension
- Customer management
- Ride management
- Search and filtering
- Report/CSV functionality
- Responsive admin interface

## Technology Stack

**Frontend**
- React.js
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

**Maps & Routing**
- Leaflet
- React Leaflet
- Leaflet Routing Machine
- OpenStreetMap / location services

**Backend & Data**
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting

**Charts & Analytics**
- Recharts

**Development & Deployment**
- Git
- GitHub
- Firebase Hosting

## Project Structure

```text
RideX/
├── client-user/      # Customer application
├── client-rider/     # Rider application
├── client-admin/     # Admin dashboard
└── README.md
```

Each application is an independent Vite/React project and can be developed and deployed separately.

## Core Data Flow

```text
Customer
   │
   ├── Books Ride
   ▼
Firestore: rides
   │
   ▼
Rider
   │
   ├── Accepts Ride
   ├── Shares Live Location
   ├── Arrives
   ├── Starts Ride
   └── Completes Ride
   │
   ▼
Customer
   │
   └── Pays via Wallet
   │
   ▼
Firestore
   │
   └── Admin Dashboard / Analytics
```

## Ride & Payment State

Ride status is maintained independently from payment status.

```text
Ride:
pending
accepted
arrived
started
completed
cancelled

Payment:
pending
paid
```

This separation keeps the ride lifecycle and payment workflow reliable and avoids mixing payment states with ride states.

## Getting Started

### Prerequisites

- Node.js
- npm
- Firebase project
- Git

### Install Dependencies

Run the following in each application:

```bash
cd client-user
npm install
```

```bash
cd ../client-rider
npm install
```

```bash
cd ../client-admin
npm install
```

### Run Locally

Customer App:

```bash
cd client-user
npm run dev
```

Rider App:

```bash
cd client-rider
npm run dev
```

Admin App:

```bash
cd client-admin
npm run dev
```

### Production Build

For each application:

```bash
npm run build
```

The production output is generated in the respective `dist/` directory.

## Firebase

All three applications use the same Firebase project for shared backend services such as:

- Authentication
- Firestore
- Real-time ride updates
- Rider location data
- Wallet transactions
- Platform analytics

Firebase Hosting can be configured with separate hosting targets so the Customer, Rider, and Admin applications can be shared and updated independently.

## Deployment

After building an application:

```bash
firebase deploy --only hosting:<target>
```

Example targets:

```text
user
rider
admin
```

The applications can therefore be hosted under separate Firebase Hosting URLs while continuing to use the same backend.

## Highlights

- Real-time ride management with Firestore listeners
- Location-aware booking and routing
- Distance-based fare calculation
- Live rider tracking
- Wallet-based ride payments
- Separate customer, rider, and admin experiences
- Operational analytics and KPI reporting
- Responsive UI across devices
- Independent deployment of all three applications

## Project Status

RideX is a feature-complete academic/internship full-stack project with the core customer, rider, admin, real-time, payment, analytics, and deployment workflows implemented.

## Author

**Nikhil**

