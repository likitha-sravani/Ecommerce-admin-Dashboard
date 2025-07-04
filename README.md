# Farm Products Ecommerce Admin Dashboard

A full-featured admin dashboard for managing farm products, orders, inventory, and analytics with real-time updates.

## Tech Stack
- **Frontend:** React + Chart.js/Recharts
- **Backend:** Django + Django Channels
- **Database:** PostgreSQL
- **Real-Time:** WebSockets (Django Channels)
- **Deployment:** Docker + AWS/GCP ready

## Features
- Admin authentication
- Product, order, and user management
- Inventory tracking and low-stock alerts
- Real-time sales tracking and analytics
- Responsive dashboard UI

## Project Structure
```
ecommerce/
│
├── backend/         # Django project
├── frontend/        # React app
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

## Getting Started

### Prerequisites
- Docker & Docker Compose installed

### Setup
1. Clone the repository
2. Copy `.env.example` to `.env` and set environment variables as needed
3. Build and start all services:
   ```
   docker-compose up --build
   ```
4. Access the frontend at `http://localhost:3000` and backend API at `http://localhost:8000`

## Deployment
- Ready for AWS/GCP deployment (see Dockerfiles and environment variables)

---

For detailed instructions, see each service's README or documentation. 