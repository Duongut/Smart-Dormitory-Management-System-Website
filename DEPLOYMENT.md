# Hướng dẫn Deploy SmartDorm

## 🚀 Deploy lên Vercel (Khuyến nghị)

### Bước 1: Chuẩn bị
1. Tạo tài khoản tại [vercel.com](https://vercel.com)
2. Kết nối với GitHub account
3. Push code lên GitHub repository

### Bước 2: Deploy
1. Truy cập [vercel.com/new](https://vercel.com/new)
2. Import repository từ GitHub
3. Vercel sẽ tự động detect Next.js project
4. Click "Deploy"

### Bước 3: Cấu hình (nếu cần)
- Environment Variables: Không cần thiết cho demo này
- Domain: Có thể custom domain sau khi deploy

## 🌐 Deploy lên Netlify

### Bước 1: Build static export
```bash
# Thêm vào next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

# Build
npm run build
```

### Bước 2: Deploy
1. Truy cập [netlify.com](https://netlify.com)
2. Drag & drop thư mục `out/` vào Netlify
3. Hoặc connect với GitHub repository

## 🐳 Deploy với Docker

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build và chạy
```bash
docker build -t smartdorm .
docker run -p 3000:3000 smartdorm
```

## 📱 Deploy lên GitHub Pages

### Bước 1: Cấu hình next.config.ts
```typescript
const nextConfig = {
  output: 'export',
  basePath: '/smart-dormitory-management',
  assetPrefix: '/smart-dormitory-management/',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

### Bước 2: GitHub Actions
Tạo file `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## 🔧 Cấu hình Environment Variables

Cho production, có thể cần các biến môi trường:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.smartdorm.vn
NEXT_PUBLIC_PAYMENT_GATEWAY_URL=https://payment.smartdorm.vn
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
```

## 📊 Monitoring và Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

### Google Analytics
```bash
npm install @next/third-parties
```

## 🔒 Security Headers

Thêm vào `next.config.ts`:
```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## 🚀 Performance Optimization

### Image Optimization
- Sử dụng Next.js Image component
- Optimize images trước khi upload
- Sử dụng WebP format

### Bundle Analysis
```bash
npm install @next/bundle-analyzer
```

### Caching
- Vercel tự động cache static assets
- Implement API caching cho dynamic content

## 📞 Support

Nếu gặp vấn đề khi deploy:
1. Check build logs
2. Verify environment variables
3. Test locally trước khi deploy
4. Liên hệ: support@smartdorm.vn
