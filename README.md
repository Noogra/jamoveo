# JaMoveo

**JaMoveo** is a real-time rehearsal platform for musicians. Users can sign up as regular players or as admins, join live rehearsal sessions, and view lyrics/chords based on their instrument. The app uses WebSocket communication for real-time interaction between admins and players.

## Technologies

- **Frontend**: React, Custom CSS, WebSocket Client
- **Backend**: Node.js, Express.js, MongoDB (Atlas), Mongoose, Socket.io
- **Deployment**: Frontend on Vercel, Backend on Render

## Setup Instructions

1. Clone the repository

2. Run the backend:
   cd backend
   npm install
   npm start
   
3. Run the frontend:
   cd frontend
   npm install
   npm start

## User Types

- **Regular User**: Register via `/signup`
- **Admin User**: Register via `/register-admin`

## Rehearsal Flow

1. The **admin** logs in and goes to their homepage.
2. On the admin homepage, clicking **"Create Rehearsal Session"** starts the session.
3. Once the session is created, all **regular users** on their homepage will see a **"Join Rehearsal"** button appear.
4. Any user who clicks **"Join Rehearsal"** is now connected to the session.
5. When the **admin selects a song**, all connected users are automatically redirected to the **Live Page** displaying the current song’s lyrics and chords, adapted to their instrument.

This flow ensures only users who explicitly joined the session are moved to the live view when a song is selected.