# 🍽 Restaurant Booking System

This is a full-stack restaurant booking application built to demonstrate a modern web development workflow. The system allows users to search for available time slots at a restaurant and create a booking.

The entire application, including the frontend, backend, and database, is containerized using **Docker** and orchestrated with **Docker Compose** for easy setup and deployment.

-----

## Architecture Diagram

![Architecture Diagram](architecture.png)

-----

### ✨ Features

  * **Search Availability:** Users can search for open reservation slots by selecting a date and party size.
  * **Create Bookings:** Once an available time slot is selected, users can complete a booking by providing their contact information.
  * **Data Persistence:** Booking data is stored and retrieved from a **SQLite** database.
  * **Secure API:** All API endpoints are protected using a simple mock authorization token in the request headers.

-----

### 🚀 Tech Stack

**Frontend:**

  * **React (Vite):** A fast and lightweight JavaScript library for building user interfaces.
  * **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
  * **Axios:** A promise-based HTTP client for making API requests.

**Backend:**

  * **FastAPI:** A modern, high-performance Python web framework for building APIs.
  * **SQLite:** A lightweight, serverless database engine for storing application data.

**DevOps:**

  * **Docker:** A platform for developing, shipping, and running applications in containers.
  * **Docker Compose:** A tool for defining and running multi-container Docker applications.

-----

### ⚙️ Getting Started

Follow these steps to get the application up and running on your local machine.

#### **1. Clone the Repository**

First, clone the project from its GitHub repository and navigate into the project directory:

```bash
git clone [<YOUR_REPO_URL>](https://github.com/Aditya19Joshi01/Restaurant-Booking-System.git)
```

> **Note:** Use the .venv stored in Backend folder if you want to run it locally without using docker

#### **2. Run with Docker Compose**

Use Docker Compose to build and start the frontend and backend services. The `--build` flag ensures that the Docker images are created before the containers are started.

```bash
docker-compose up --build
```

Once the command completes, the application will be accessible at the following URLs:

  * **Frontend:** `http://localhost:5173`
  * **Backend API:** `http://localhost:8547`

-----

### 🧪 Using the Application

Navigate to the frontend URL to interact with the application.

  * **Check Availability:** Select a date and party size on the home page and click **"Check Availability."** The system will display all available time slots for that day.
  * **Make a Booking:** Choose an available time slot, fill out the required customer details (name, phone, email), and click **"Book Now"** to confirm your reservation.

> **Note:** The database is preloaded with data for a fictional restaurant named **"TheHungryUnicorn"** to facilitate testing.

-----

### 🔑 Authentication

All API requests require a valid authorization token in the header. For testing purposes, use the following mock token:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFwcGVsbGErYXBpQHJlc2RpYXJ5LmNvbSIsIm5iZiI6MTc1NDQzMDgwNSwiZXhwIjoxNzU0NTE3MjA1LCJpYXQiOjE3NTQ0MzA4MDUsImlzcyI6IlNlbGYiLCJhdWQiOiJodHRwczovL2FwaS5yZXNkaWFyeS5jb20ifQ.g3yLsufdk8Fn2094SB3J3XW-KdBc0DY9a2Jiu_56ud8`
```

-----

### 📂 Project Structure

```bash
.
├── Restaurant-Booking-Mock-API-Server  # FastAPI backend service
│   ├── app
│   ├── requirements.txt
│   └── Dockerfile
├── Restaurant-Booking-Frontend  # React frontend service
│   ├── src
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yaml      # Docker Compose configuration
└── README.md               # Project documentation
```

-----

### 📜 API Endpoints

The backend API provides the following key endpoints:

#### **Check Availability**

  * **URL:** `/api/ConsumerApi/v1/Restaurant/{restaurant_name}/AvailabilitySearch`
  * **Method:** `POST`
  * **Headers:** `Authorization: Bearer test-token`
  * **Content-Type:** `application/x-www-form-urlencoded`

#### **Create Booking**

  * **URL:** `/api/ConsumerApi/v1/Restaurant/{restaurant_name}/BookingWithStripeToken`
  * **Method:** `POST`
  * **Headers:** `Authorization: Bearer test-token`
  * **Content-Type:** `application/x-www-form-urlencoded`

-----

### 👨‍💻 Author

This project was completed by **Aditya Joshi** as a technical assessment for Locai Labs.