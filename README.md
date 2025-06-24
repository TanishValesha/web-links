# 🔐 Web Links - Full Stack Auth-Protected App

A full-stack web application with secure JWT-based authentication, protected routes, and modern UI built using React (Vite) and Express. The project features client-side route protection, seamless cookie-based session persistence, and RESTful API integration.

---

## Features

-  **JWT Auth with Cookies** — Secure, httpOnly cookie-based login flow
-  **Protected Routes** — `/dashboard` and similar routes are accessible only when logged in
-  **Auto Session Persistence** — Remain logged in across reloads with token stored in cookie
-  **Prisma ORM** — Typesafe database access using PostgreSQL
-  **React + Vite** — Lightning-fast frontend dev experience
-  **API Integration** — Clean REST APIs for login, registration, and user status
-  **CORS + Credentials** — Full CORS + cookie support across Vercel ↔ Render
-  **And Much More**

---

##  Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
- [CORS](https://www.npmjs.com/package/cors)

---

## Deployment
- [Frontend: Vercel](https://vercel.com)
- [Backend: Render](https://render.com)

---

## Local Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** package manager
- **PostgreSQL** database (local or cloud instance)
- **Git** for version control

### Environment Variables

Create a `.env` file in the root of your server directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"

# JWT Secret (generate a secure random string)
JWT_SECRET="your-super-secure-jwt-secret-key-here"

# Server Configuration
PORT=3000
NODE_ENV=development

# GROQ API Key (for AI features)
GROQ_API_KEY="your-groq-api-key-here"
```

Create a `.env` file in the root of your client directory with the following variables:

```env
VITE_API_BASE_URL="http://localhost:5173"
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/TanishValesha/web-links.git
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Database Setup

```bash
# Navigate to server directory
cd server

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### 4. Build the Application

```bash
# Build TypeScript files
npm run build
```

### 5. Start the Development Server

```bash
# Development mode for client with hot reload
npm run dev

# Development mode for server with hot reload
node ./src/index.ts
      OR
npm install nodemon
nodemon ./src/index.ts

# Or production mode
npm start
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user status

### Link Management Routes (`/api/link`)
- `POST /api/link` - Save a new link
- `POST /api/link/fetch` - Prefetch link metadata
- `GET /api/link` - Get all user links
- `GET /api/link/:id` - Get specific link by ID
- `DELETE /api/link/:id` - Delete a link

## Database Schema
![image](https://github.com/user-attachments/assets/bd8f0788-445e-4163-8592-b8fba526b2d4)


## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **Database connection errors**
   - Verify your `DATABASE_URL` is correct
   - Ensure PostgreSQL is running
   - Check database credentials

3. **Prisma client errors**
   ```bash
   # Regenerate Prisma client
   npx prisma generate
   
   # Reset database (⚠️ This will delete all data)
   npx prisma migrate reset
   ```

4. **Build errors**
   ```bash
   # Clean build
   rm -rf dist/
   npm run build
   ```

### Environment-Specific Issues

**Development:**
- Make sure `NODE_ENV=development` in your `.env`
- Use `npm run dev` for hot reload

**Production:**
- Set `NODE_ENV=production`
- Ensure all environment variables are set
- Use `npm start` after building
- 
---

### Deployment
- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Render](https://render.com)

---
