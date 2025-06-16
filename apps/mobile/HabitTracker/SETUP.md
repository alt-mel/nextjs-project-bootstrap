# HabitTracker Mobile App Setup Guide

## Running the Full Application

### 1. Start the Backend Server

First, start the backend API server:

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (if not already done)
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up database
createdb habittracker  # Create PostgreSQL database
alembic upgrade head   # Run migrations

# Start the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The backend API will be available at:
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### 2. Start the Mobile App

In a new terminal, start the React Native app:

```bash
# Navigate to mobile app directory
cd apps/mobile/HabitTracker

# Install dependencies
npm install

# Start the development server
npm start
```

This will open Expo DevTools in your browser. From there you can:
- Press 'i' to run on iOS simulator (requires macOS and Xcode)
- Press 'a' to run on Android emulator (requires Android Studio)
- Scan QR code with Expo Go app on your physical device

## Development Environment Setup

### Prerequisites
1. Node.js 16+ and npm
2. Python 3.10+
3. PostgreSQL database
4. Expo CLI: `npm install -g expo-cli`
5. iOS/Android development tools:
   - For iOS: Xcode (macOS only)
   - For Android: Android Studio & SDK

### Environment Configuration

1. Backend (.env in backend directory):
```env
DATABASE_URL=postgresql+asyncpg://user:password@localhost/habittracker
JWT_SECRET=your-secret-key
```

2. Mobile App (.env in apps/mobile/HabitTracker):
```env
API_URL=http://localhost:8000
```

## Available Commands

### Backend
- Start server: `uvicorn main:app --reload`
- Run tests: `pytest`
- Create migration: `alembic revision --autogenerate -m "description"`
- Apply migrations: `alembic upgrade head`

### Mobile App
- Start dev server: `npm start`
- Run on iOS: `npm run ios`
- Run on Android: `npm run android`
- Run tests: `npm test`
- Lint code: `npm run lint`

## Troubleshooting

### Backend Issues
1. Database connection errors:
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

2. Migration errors:
   - Run `alembic current` to check status
   - Try `alembic stamp head` to reset

### Mobile App Issues
1. Metro bundler:
   - Clear cache: `npm start -- --clear`
   - Reset: `expo r -c`

2. Dependencies:
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Reset Expo: `expo start -c`

3. Simulator/Emulator:
   - iOS: Reset simulator in Xcode
   - Android: Wipe data in AVD Manager

4. Network:
   - Ensure backend is accessible
   - Check API_URL in .env
   - Verify correct ports are open

## Development Tips

1. Use the API documentation at /docs for backend endpoints
2. Test API responses in browser/Postman before mobile integration
3. Monitor backend logs for errors
4. Use React Native Debugger for frontend debugging
5. Keep both backend and frontend running during development
