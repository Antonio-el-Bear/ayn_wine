# Frontend Deployment Guide

## Deploying to Vercel via GitHub

### Prerequisites
- GitHub account with this repository
- Vercel account (free at https://vercel.com)

### Step-by-Step Deployment

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Sign Up" or "Login" (use GitHub login)
   - Click "Add New Project"
   - Import your `Antonio-el-Bear/ayn_wine` repository

3. **Configure the Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install`

4. **Environment Variables**
   Add these in the Vercel dashboard under "Environment Variables":
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
   ```
   (Update with your actual backend URL once deployed)

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like: `https://ayn-wine.vercel.app`

### Automatic Deployments

Once connected, Vercel will automatically:
- Deploy every push to `main` branch → Production
- Deploy every pull request → Preview deployment
- Show build status on GitHub

### Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Alternative: GitHub Pages (Static Export)

If you want to use GitHub Pages instead, you'll need to export as a static site:

1. Update `next.config.js` to add:
   ```javascript
   output: 'export',
   images: { unoptimized: true }
   ```

2. Build the static site:
   ```bash
   cd apps/web
   npm run build
   ```

3. Deploy the `out` folder to GitHub Pages

**Note**: This removes server-side features (API routes, SSR, etc.)
