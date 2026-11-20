GameShelf Collection

LIVE DEMO: 
            https://game-collection-fs-app.vercel.app/
!!!! Performance Notice (Render free tier) 
            - The backend is hosted on Render using the free tier
            - Free instances automatically spin down after periods of inactivity, which causes a cold start delay up to 50 seconds on the first user request of the day.
            - This delay is not related to application performance or implementation quality, it is a limitation of the hosting plan

The frontend (React + Vite) is deployed on Vercel
The backend (NestJS) is deployed on Render
The application uses Supabase PostgreSQL as its database provider

GameShelf Collection is a personal full‑stack project built to help me understand how modern web applications are structured and how the frontend communicates with the backend. 
The application allows users to create an account and manage their own video game collection.

The project was developed as a practical exercise in building a complete client‑server system. Users can register, log in, add games to their collection, view details, and remove entries. 
All data is stored securely and associated with the authenticated user. 
The main goal of this project is to gain hands‑on experience with full‑stack development, authentication, routing, and database management.

Technologies Used
  
#Frontend : React

#Backend
  - NestJS
  - Prisma ORM
  - JWT

Features
  - User registration and login  
  - Protected routes based on JWT  
  - Add, delete, and view games in a personal collection (Using public API)
  - Interface built with React  
  
