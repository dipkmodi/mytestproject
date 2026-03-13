# Firebase Configuration Guide

## Error You're Seeing

```
Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.).
```

This error means your app is using placeholder/demo Firebase credentials instead of real ones.

## Solution: Set Up Firebase in 5 Minutes

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com (sign in with Google account)
2. Click **"Add project"**
3. Enter project name: `mytestproject`
4. Click **"Create project"** and wait for setup

### Step 2: Enable Authentication
1. In left sidebar, click **Authentication**
2. Click **"Get started"** 
3. Find **Email/Password** option
4. Click the toggle to enable it
5. Click **"Save"**

### Step 3: Get Your Firebase Config
1. Click the **gear icon** (⚙️) at top-left
2. Click **"Project Settings"**
3. Scroll down to **"Your apps"** section
4. If no web app exists, click **"< >"** to create one
5. You'll see your Firebase config - copy these 6 values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### Step 4: Update .env.local File

Replace the entire contents of `.env.local` (in your project root folder) with:

```
EXPO_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

**Example:**
```
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyDj2QF7pF4q8X5q7q7qQ1q1q1q1q1q1q1q
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=mytestproject-12345.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=mytestproject-12345
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=mytestproject-12345.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef12345678
```

### Step 5: Rebuild and Redeploy

After updating `.env.local`, run:

```bash
npx expo export -p web
vercel --prod ./dist
```

## Testing

1. Visit your deployed app URL
2. Click "Don't have an account? Sign Up"
3. Create a new account with any email
4. You should now be able to sign in!

## Troubleshooting

**Still getting "api-key-not-valid" error?**
- Verify all 6 values are copied correctly from Firebase Console
- Make sure `.env.local` has no spaces before/after the `=` signs
- Restart the build process: `npx expo export -p web`
- Clear cache: `rm -rf .next dist`

**Getting "auth/operation-not-allowed" error?**
- Go to Firebase Console > Authentication
- Make sure **Email/Password** is enabled (toggle should be blue/ON)

**Can't create account or login?**
- Check that your `.env.local` has been saved
- Verify all 6 Firebase values are correct
- Try creating the account again

Need help? Check [Firebase Console](https://console.firebase.google.com) to verify your project is set up correctly.
