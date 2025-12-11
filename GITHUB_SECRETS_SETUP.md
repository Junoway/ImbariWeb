# Add Firebase Secrets to GitHub

Your build is failing because GitHub Actions doesn't have the Firebase credentials. Follow these steps:

## Step 1: Go to Repository Settings

1. Open: https://github.com/Junoway/ImbariWeb/settings/secrets/actions
2. Click **"New repository secret"**

## Step 2: Add Each Secret

Add these **7 secrets** one by one (copy values from your `.env.local` file):

### Secret 1:
- **Name**: `NEXT_PUBLIC_FIREBASE_API_KEY`
- **Value**: `AIzaSyD4XKQs12HVqeZSws1yMPBx4k30kk6Ms68`

### Secret 2:
- **Name**: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- **Value**: `imbari-coffee-chat.firebaseapp.com`

### Secret 3:
- **Name**: `NEXT_PUBLIC_FIREBASE_DATABASE_URL`
- **Value**: `https://imbari-coffee-chat-default-rtdb.firebaseio.com`

### Secret 4:
- **Name**: `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- **Value**: `imbari-coffee-chat`

### Secret 5:
- **Name**: `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- **Value**: `imbari-coffee-chat.firebasestorage.app`

### Secret 6:
- **Name**: `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- **Value**: `211290535998`

### Secret 7:
- **Name**: `NEXT_PUBLIC_FIREBASE_APP_ID`
- **Value**: `1:211290535998:web:e33f18d66dd94116d6396f`

## Step 3: Re-run Failed Build

1. Go to: https://github.com/Junoway/ImbariWeb/actions
2. Click on the failed workflow
3. Click **"Re-run all jobs"**

## Quick Access Links:

- **Add Secrets**: https://github.com/Junoway/ImbariWeb/settings/secrets/actions
- **View Actions**: https://github.com/Junoway/ImbariWeb/actions

---

**After adding all 7 secrets, the build will succeed automatically!** ✅
