# Training Plan App

A React TypeScript application for managing user profiles and training plans, built with Redux Toolkit and Material-UI.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

1. Create a new React TypeScript project:
   ```bash
   npx create-react-app training-plan-app --template typescript
   cd training-plan-app
   ```

2. Install dependencies:
   ```bash
   # Core dependencies
   npm install @reduxjs/toolkit react-redux @mui/material @emotion/react @emotion/styled express

   # Development dependencies
   npm install --save-dev typescript @types/react @types/react-dom @types/express @types/node ts-node nodemon concurrently
   ```

3. Update package.json with proxy and scripts:
   ```json
   {
     "proxy": "http://localhost:3001",
     "scripts": {
       "start": "react-scripts start",
       "build": "react-scripts build",
       "server": "ts-node src/server/index.ts",
       "dev": "concurrently \"npm run server\" \"npm start\""
     }
   }
   ```

4. Create the project structure:
   ```bash
   mkdir -p src/{components,features,store,types,server}
   ```

## Project Structure

```
src/
├── components/        # React components
│   └── Profile.tsx   # Main profile component
├── features/         # Redux slices
│   └── userSlice.ts  # User-related state management
├── store/            # Redux store configuration
│   └── index.ts      # Store setup
├── types/            # TypeScript interfaces
│   └── index.ts      # Type definitions
├── server/           # Express backend
│   └── index.ts      # Server setup and API endpoints
├── App.tsx           # Root React component
└── custom.d.ts       # Type declarations
```

## Running the Application

### Development Mode (Frontend + Backend)
Run both the frontend and backend servers simultaneously:
```bash
npm run dev
```

### Running Separately

1. Start the backend server:
   ```bash
   npm run server
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Features

- View user profile and training plan
- Edit profile information
- Real-time updates
- Persistent storage on the server
- Material-UI components for a modern look
- TypeScript for type safety
- Redux for state management

## API Endpoints

- `GET /api/profile` - Fetch user profile
- `PUT /api/profile` - Update user profile

## Tech Stack

- React 18 with TypeScript
- Redux Toolkit for state management
- Material-UI for components
- Express.js backend
- Node.js runtime

## Development Notes

1. The backend server uses in-memory storage. In a production environment, replace it with a proper database.
2. Add error handling and input validation as needed.
3. Consider adding authentication for production use.

## Troubleshooting

1. TypeScript errors:
   - Run `npm install` to ensure all dependencies are installed
   - Check if tsconfig.json is properly configured
   - Make sure all required @types packages are installed

2. Backend connection issues:
   - Verify that port 3001 is not in use
   - Check if the proxy is properly set in package.json
   - Ensure the server is running (`npm run server`)

3. Frontend issues:
   - Clear browser cache
   - Check browser console for errors
   - Restart development server