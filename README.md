# Sensor Control Web Dashboard

A **React + Vite + TypeScript** web application for real-time vehicle sensor monitoring, control, and telemetry tracking. Built with **Material-UI** for a modern and responsive interface, integrated with a **Flask + Firebase backend** via REST APIs and **Socket.IO** for live telemetry updates.

---

## Features

✅ **Real-time Dashboard** — Live metrics including distance, speed, CPU temperature, motor status, and connection state.  
✅ **Socket.IO Integration** — Instant updates via WebSocket connection for low-latency telemetry streaming.  
✅ **Authentication** — Secure JWT-based login/signup with role-based access (User vs. Doctor).  
✅ **History Viewer** — Browse past telemetry logs stored in Firebase Firestore.  
✅ **Vehicle Control** — Send low/high/stop speed commands to the connected vehicle.  
✅ **Material-UI Theming** — Professional, customizable design system with Space Grotesk font.  
✅ **Responsive Design** — Optimized for desktop, tablet, and mobile viewing.  

---

## Project Structure

```
nitk01/
├── src/
│   ├── components/         # Reusable UI components (MetricCard, StatusPill, etc.)
│   ├── layouts/           # Layout shells (AppFrame with drawer navigation)
│   ├── pages/             # Route pages (Dashboard, History, Explore, Login, Signup)
│   ├── services/          # API/auth/socket service utilities
│   ├── types/             # TypeScript type definitions
│   ├── theme.ts           # Material-UI theme configuration
│   ├── App.tsx            # Main routing component
│   └── main.tsx           # Application entry point
├── .env                   # Environment variables (API base URL)
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **Backend running** — Flask server at `http://127.0.0.1:5000` (or configure `.env`)

### Installation

1. **Clone or navigate to this project:**

   ```bash
   cd c:\Users\kiran\OneDrive\Desktop\nitk01
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure backend URL** (optional):

   Edit `.env` to point to your Flask server:

   ```
   VITE_API_BASE=http://127.0.0.1:5000
   ```

4. **Start the dev server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173/` (or next available port).

---

## Backend Requirements

This web app expects a Flask backend with the following endpoints:

| Method | Endpoint         | Description                                    |
|--------|------------------|------------------------------------------------|
| POST   | `/api/signup`    | Register new user (name, email, password, role)|
| POST   | `/api/login`     | Authenticate user (email, password)            |
| POST   | `/api/speed`     | Send speed command (LOW/HIGH/STOP)             |
| GET    | `/api/logs`      | Retrieve past telemetry logs                   |
| Socket | `telemetry`      | Real-time telemetry broadcast via Socket.IO    |

**Backend must:**
- Issue JWT tokens on signup/login
- Validate tokens via `Authorization: Bearer <token>` header
- Support Socket.IO with token-based authentication

---

## Available Scripts

- **`npm run dev`** — Start development server with HMR
- **`npm run build`** — Production build (outputs to `dist/`)
- **`npm run preview`** — Preview production build locally
- **`npm run lint`** — Run ESLint checks

---

## Technologies Used

- **React 19** + **TypeScript**
- **Vite** (fast bundler with HMR)
- **Material-UI (MUI)** — Component library and theming
- **React Router** — Client-side routing
- **Socket.IO Client** — Real-time WebSocket communication
- **Space Grotesk** — Modern sans-serif font

---

## Usage

1. **Sign up** or **log in** using credentials from the backend.
2. **Dashboard** shows live metrics and allows speed control.
3. **History** tab displays all past telemetry logs (if doctor, shows all users).
4. **Explore** tab provides quick feature highlights.

The app integrates seamlessly with the existing **Expo React Native** sensor app — they share the same backend logic and API.

---

## Notes

- Replace `http://127.0.0.1:5000` in `.env` with your actual backend URL (e.g., deployed server).
- Ensure CORS is enabled on the backend for web clients.
- The backend must **broadcast** telemetry via Socket.IO on every sensor update for live dashboard updates.

---

## License

This is a demonstration project. Use at your own discretion.
