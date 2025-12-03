# 🚀 Mystery.exe Deployment Guide

This guide covers the complete deployment process for the Mystery.exe quantum logic terminal interface.

## 📋 Pre-Deployment Checklist

### ✅ Code Quality
- [ ] Run `npm run lint` - No ESLint errors
- [ ] Run `npm run build` - Successful production build
- [ ] Run `npm run analyze` - Bundle size analysis
- [ ] Test all room passcodes work correctly
- [ ] Verify responsive design on mobile/tablet/desktop

### ✅ Assets & Content
- [ ] Clue images placed in `public/clues/` directory
- [ ] Image naming follows `{passcode}.jpg` format
- [ ] Images optimized for web (under 2MB each)
- [ ] Favicon and icons present in `public/` directory

### ✅ Configuration
- [ ] Environment variables configured (see `.env.example`)
- [ ] Vercel.json properly configured
- [ ] Meta tags and SEO settings verified
- [ ] Sitemap generation working

## 🛠️ Environment Setup

### Required Environment Variables

Create `.env.local` for development and set in Vercel for production:

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=true

# Build
NEXT_TELEMETRY_DISABLED=0
```

### Vercel Dashboard Configuration

1. **Project Settings > Environment Variables:**
   - Set `NODE_ENV=production`
   - Set `NEXT_PUBLIC_APP_URL=https://your-project.vercel.app`
   - Configure any API keys or third-party integrations

2. **Project Settings > Functions:**
   - Runtime: Node.js
   - Region: Frankfurt (fra1) - recommended for European users

## 🚀 Deployment Steps

### Method 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set project name
# - Configure settings (use defaults)
# - Deploy
```

### Method 2: Vercel Dashboard

1. **Import Project:**
   - Go to [vercel.com](https://vercel.com/dashboard)
   - Click "New Project"
   - Import Git repository
   - Select the mystery-exe repository

2. **Configure Build Settings:**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next (automatic)
   Install Command: npm install
   ```

3. **Environment Variables:**
   - Add all required environment variables
   - Set appropriate scopes (Production, Preview, Development)

4. **Deploy:**
   - Click "Deploy"
   - Monitor build progress
   - Access site at generated URL

## 🔧 Post-Deployment Configuration

### Custom Domain Setup

1. **Add Domain:**
   - Project Settings > Domains
   - Enter your custom domain
   - Click "Add"

2. **DNS Configuration:**
   - Copy the DNS records provided by Vercel
   - Add them to your DNS provider
   - Wait for DNS propagation (can take up to 48 hours)

### SSL Certificate

- Vercel automatically provisions SSL certificates
- HTTPS is enabled by default
- Custom domains get automatic SSL

### Performance Monitoring

1. **Enable Vercel Analytics:**
   - Project Settings > Analytics
   - Toggle on for real-time performance data

2. **Core Web Vitals:**
   - Monitor LCP, FID, CLS metrics
   - Use Vercel dashboard for performance insights

## 📸 Adding Clue Images

### Image Requirements
- **Format:** JPG, PNG, or WebP
- **Naming:** `{passcode}.jpg` (e.g., `1EC210.jpg`)
- **Size:** Minimum 800x600px, recommended 1200x800px
- **File Size:** Under 2MB for optimal loading
- **Aspect Ratio:** 16:10 or similar wide format

### Upload Process

1. **Local Development:**
   ```bash
   # Place images in public/clues/ directory
   cp my-clue-image.jpg public/clues/1EC210.jpg
   ```

2. **Production Updates:**
   - Upload images to `public/clues/` directory
   - Commit and push to trigger redeployment
   - Vercel will automatically rebuild and deploy

### Image Optimization

The application automatically optimizes images using Next.js Image component:
- WebP/AVIF conversion
- Responsive sizing
- Lazy loading
- CDN delivery via Vercel

## 🐛 Troubleshooting

### Build Failures

**Common Issues:**
- Missing environment variables
- TypeScript compilation errors
- Missing dependencies

**Debug Steps:**
```bash
# Check for linting errors
npm run lint

# Test build locally
npm run build

# Check bundle size
npm run analyze
```

### Runtime Errors

**404 Errors on Room Pages:**
- Check if `generateStaticParams` includes all room codes
- Verify room data exists in `roomConfig.ts`

**Image Loading Issues:**
- Confirm images are in `public/clues/` directory
- Check file naming matches passcodes exactly
- Verify images are not corrupted

**Performance Issues:**
- Run bundle analyzer: `npm run analyze`
- Check for large dependencies
- Optimize images before uploading

### Deployment Issues

**Vercel Build Timeouts:**
- Reduce bundle size
- Optimize images
- Check for infinite loops in code

**Environment Variable Issues:**
- Verify variables are set in Vercel dashboard
- Check variable names match exactly
- Ensure proper scoping (Production/Preview/Development)

## 📊 Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Profile build performance
npm run build:profile
```

### Image Optimization

- Use WebP format for better compression
- Resize images appropriately (1200px width recommended)
- Compress images before uploading
- Use descriptive alt texts

### Caching Strategy

The application implements multi-layer caching:
- **Static Assets:** 1 year cache (immutable)
- **API Routes:** 5 minutes with revalidation
- **Images:** 1 day with 7-day edge cache
- **ISR Pages:** Automatic revalidation

## 🔒 Security Considerations

### Environment Variables
- Never commit sensitive keys to repository
- Use Vercel dashboard for production secrets
- Rotate keys regularly

### Content Security Policy
- Implemented via headers in `vercel.json`
- Restricts external resource loading
- Protects against XSS attacks

### Access Control
- Room access requires valid passcodes
- No authentication system (passcode-based)
- Rate limiting via Vercel edge functions

## 📈 Monitoring & Maintenance

### Regular Tasks

**Weekly:**
- Check Vercel analytics for performance metrics
- Review error logs in Vercel dashboard
- Monitor Core Web Vitals scores

**Monthly:**
- Update dependencies
- Review bundle size changes
- Check for security vulnerabilities

**Quarterly:**
- Performance audit with Lighthouse
- Review and optimize images
- Update room content and clues

### Backup Strategy

- Code is version controlled on Git
- Static assets served via Vercel CDN
- Database backups (if applicable)
- Regular exports of user-generated content

## 🎯 Success Metrics

### Performance Targets
- **Lighthouse Score:** 90+ overall
- **Core Web Vitals:** All green scores
- **Bundle Size:** Under 200KB for initial load
- **Image Loading:** Under 2 seconds

### User Experience
- **Page Load:** Under 3 seconds
- **Time to Interactive:** Under 5 seconds
- **Mobile Responsiveness:** Perfect on all devices
- **Accessibility:** WCAG 2.1 AA compliance

## 📞 Support

For deployment issues:
1. Check Vercel dashboard for error logs
2. Review build output for specific errors
3. Consult this deployment guide
4. Check Vercel documentation
5. Contact development team if needed

---

**Deployment completed successfully!** 🎉

Your Mystery.exe quantum terminal interface is now live and ready for users to explore the mysteries of the facility.
