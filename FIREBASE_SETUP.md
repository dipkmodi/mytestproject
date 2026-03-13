# Firebase Setup Guide

This app uses Firebase Authentication and Firestore database for user management and session handling.

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Name your project (e.g., "MyApp")
4. Follow the setup wizard
5. Enable Google Analytics (optional)

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Save

### 3. Get Your Firebase Credentials

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Under "Your apps", select or create a Web app
3. Copy your config object with the following keys:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### 4. Update Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase credentials:

```
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

## Features

- **User Registration**: Users can create accounts with email and password
- **User Login**: Email/password authentication with validation
- **Session Management**: Firebase automatically manages user sessions
- **Password Hashing**: Firebase handles password hashing and security
- **Offline Persistence**: Sessions persist across app restarts

## Usage

### Sign Up
Users can create a new account by providing an email and password. The password is securely hashed by Firebase.

### Login
Users can log in with their registered email and password. The app validates credentials against Firebase and maintains a session.

### Sign Out
Users can sign out, which clears the session and returns them to the login screen.

## Security Notes

- Never commit `.env.local` with real Firebase credentials to version control
- Keep your Firebase API key safe; it's only for web/mobile apps
- Firebase Authentication handles password hashing automatically
- Enable Firestore Security Rules for production (see Firebase Console)

## Testing

After setting up Firebase:
1. Create a test account through the app or Firebase Console
2. Log in with your credentials
3. Verify the session persists after closing and reopening the app

For more information, see [Firebase Documentation](https://firebase.google.com/docs)
