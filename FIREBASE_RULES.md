# Firebase Realtime Database Security Rules

## Current Issue
**PERMISSION_DENIED**: The database is rejecting review submissions because security rules are blocking writes.

## Solution: Update Firebase Rules

### Steps to Fix:

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select your project**: `imbari-coffee-chat`
3. **Navigate to**: Realtime Database → Rules (in the left sidebar)
4. **Replace the current rules** with the rules below
5. **Click "Publish"**

---

## Security Rules (Copy & Paste)

```json
{
  "rules": {
    "chats": {
      "$sessionId": {
        ".read": true,
        ".write": true,
        "messages": {
          ".indexOn": ["timestamp"]
        }
      }
    },
    "reviews": {
      "$productId": {
        ".read": true,
        ".write": true,
        "$reviewId": {
          ".validate": "newData.hasChildren(['name', 'email', 'rating', 'comment', 'productId', 'verified', 'timestamp'])",
          "name": {
            ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 100"
          },
          "email": {
            ".validate": "newData.isString() && newData.val().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i)"
          },
          "rating": {
            ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 5"
          },
          "comment": {
            ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 1000"
          },
          "productId": {
            ".validate": "newData.isString() && newData.val().length > 0"
          },
          "verified": {
            ".validate": "newData.isBoolean()"
          },
          "timestamp": {
            ".validate": "newData.isNumber()"
          }
        }
      }
    }
  }
}
```

---

## What These Rules Do:

### 📝 Reviews Section (`/reviews/{productId}`)
- ✅ **Read**: Anyone can read reviews (public visibility)
- ✅ **Write**: Anyone can submit reviews (no auth required)
- ✅ **Validation**: 
  - Name: 1-100 characters
  - Email: Valid email format
  - Rating: Number between 1-5
  - Comment: 1-1000 characters
  - ProductId: Non-empty string
  - Verified: Boolean (false by default)
  - Timestamp: Number

### 💬 Chats Section (`/chats/{sessionId}`)
- ✅ **Read/Write**: Full access (existing functionality)
- ✅ **Indexing**: Messages indexed by timestamp

---

## Testing After Update:

1. **Refresh your browser** at: http://localhost:3001/shop/medium-roast-ground-coffee-12oz
2. **Click "Write a Review"**
3. **Fill in the form**:
   - Name: Test User
   - Email: test@example.com
   - Rating: 5 stars
   - Comment: This is a test review
4. **Click "Submit Review"**
5. **Expected**: Success message + review appears on page

---

## Production Considerations:

### ⚠️ Current Setup (Development-Friendly)
- No authentication required
- Anyone can submit reviews
- Good for testing and initial launch

### 🔒 Future Improvements (Optional)
When you want to add more security:

```json
{
  "rules": {
    "reviews": {
      "$productId": {
        ".read": true,
        ".write": "auth != null",  // Require authentication
        "$reviewId": {
          // ... same validation rules
        }
      }
    }
  }
}
```

Or add rate limiting:
```json
{
  "rules": {
    "reviews": {
      "$productId": {
        ".read": true,
        "$reviewId": {
          ".write": "!data.exists() && newData.child('email').val() == auth.token.email"
        }
      }
    }
  }
}
```

---

## Verification:

After publishing the rules, you should see in Firebase Console:
- **Rules**: Shows the new JSON
- **Simulator**: You can test read/write operations
- **Usage**: Monitor review submissions in the Data tab

Navigate to: **Realtime Database → Data** to see:
```
imbari-coffee-chat/
├── chats/
└── reviews/
    └── medium-roast-ground-coffee-12oz/
        └── -NxxxxxxxxxxxxxxX/
            ├── name: "Test User"
            ├── email: "test@example.com"
            ├── rating: 5
            ├── comment: "This is a test review"
            ├── productId: "medium-roast-ground-coffee-12oz"
            ├── verified: false
            └── timestamp: 1765491234567
```

---

## Quick Access Link:
https://console.firebase.google.com/project/imbari-coffee-chat/database/imbari-coffee-chat-default-rtdb/rules

---

**After updating the rules, the "PERMISSION_DENIED" error will be resolved and customers can submit reviews!** ✅
