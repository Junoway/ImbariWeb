# Development Workflow Guide

## Branch Strategy

### Main Branch (Production)
- **Branch**: `main`
- **Purpose**: Live production code
- **URL**: https://imbaricoffee.com (via GitHub Pages)
- **Auto-deploys**: Every push triggers GitHub Actions deployment

### Development Branch
- **Branch**: `dev`
- **Purpose**: Active development and testing
- **Testing**: Local development server (http://localhost:3000)
- **Merge to main**: When features are tested and ready

## Daily Workflow

### 1. Working on Features (Development)
```powershell
# Start your dev session
cd C:\Users\User\Documents\imbari-coffee-site

# Make sure you're on dev branch
git checkout dev

# Pull latest changes
git pull origin dev

# Start local dev server for testing
npm run dev
# Test at: http://localhost:3000

# Make your changes to files...

# Commit frequently
git add .
git commit -m "Add feature: description of changes"

# Push to dev branch
git push origin dev
```

### 2. Testing Changes Locally
```powershell
# While npm run dev is running:
# - Test all pages
# - Test contact form
# - Test shop functionality
# - Test cart and checkout
# - Test on different browsers
# - Test mobile responsiveness
```

### 3. Deploying to Production
```powershell
# When feature is tested and ready
git checkout main

# Merge dev into main
git merge dev

# Push to main (triggers auto-deployment)
git push origin main

# Switch back to dev for next feature
git checkout dev
```

## Quick Commands Reference

### Check which branch you're on
```powershell
git branch
```

### Create dev branch (first time only)
```powershell
git checkout -b dev
git push -u origin dev
```

### Switch between branches
```powershell
git checkout dev    # Switch to development
git checkout main   # Switch to production
```

### See your changes
```powershell
git status          # See modified files
git diff           # See actual changes
```

### Undo uncommitted changes
```powershell
git restore <file>  # Undo changes to specific file
git restore .       # Undo all changes
```

### Update from remote
```powershell
git pull origin dev   # Update dev branch
git pull origin main  # Update main branch
```

## Typical Day Example

**Morning**: Start working on new feature
```powershell
git checkout dev
git pull origin dev
npm run dev
# Make changes, test locally
git add .
git commit -m "WIP: working on new product images"
git push origin dev
```

**Afternoon**: Continue development
```powershell
# npm run dev still running
# Make more changes
git add .
git commit -m "Complete: new product images added"
git push origin dev
```

**End of Day**: Deploy to production
```powershell
# Stop dev server (Ctrl+C)
# Test one more time
npm run dev
# Verify everything works

# Deploy to production
git checkout main
git merge dev
git push origin main

# Back to dev for tomorrow
git checkout dev
```

## Emergency Fixes (Hotfix Workflow)

If production has a critical bug:
```powershell
# Fix directly on main
git checkout main
# Make quick fix
git add .
git commit -m "Hotfix: description of fix"
git push origin main

# Also update dev branch with the fix
git checkout dev
git merge main
git push origin dev
```

## Viewing Deployment Status

After pushing to main:
1. Go to: https://github.com/Junoway/ImbariWeb/actions
2. See GitHub Actions deployment progress
3. Wait ~2-3 minutes for deployment
4. Visit: https://imbaricoffee.com to verify

## Best Practices

✅ **DO:**
- Always work on `dev` branch for new features
- Test thoroughly on localhost before merging to main
- Commit frequently with clear messages
- Pull before you push
- Keep dev and main in sync

❌ **DON'T:**
- Don't work directly on `main` (except hotfixes)
- Don't push untested code to `main`
- Don't force push (`git push -f`)
- Don't commit sensitive data (.env files)

## Rollback (If Something Breaks)

If production breaks after deployment:
```powershell
git checkout main

# Go back one commit
git reset --hard HEAD~1

# Force push to revert production
git push --force origin main

# Fix the issue on dev
git checkout dev
# Make fixes...
```

## Continuous Testing Checklist

Before merging dev to main, verify:
- [ ] All pages load without errors
- [ ] Images display correctly
- [ ] Contact form sends emails
- [ ] Shop products show proper prices
- [ ] Cart functionality works
- [ ] Subscriber discounts apply correctly
- [ ] Mobile responsive on phone
- [ ] No console errors in browser
- [ ] Links all work correctly
- [ ] Email verification works

## Collaboration with Team

If working with others:
```powershell
# See what others changed
git log --oneline

# Get teammate's changes
git pull origin dev

# Resolve conflicts if any
# Edit conflicted files, then:
git add .
git commit -m "Merge: resolve conflicts"
git push origin dev
```

---

**Current Status**: Working on `main` branch
**Next Step**: Create `dev` branch and switch to it for development
