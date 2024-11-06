FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/download/v9.12.0/pnpm-linuxstatic-x64" && \
  chmod +x /bin/pnpm

# Copy only package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install pnpm in builder stage
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/download/v9.12.0/pnpm-linuxstatic-x64" && \
  chmod +x /bin/pnpm

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set Next.js telemetry to disabled
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Install pnpm in production stage
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/download/v9.12.0/pnpm-linuxstatic-x64" && \
  chmod +x /bin/pnpm

# Copy necessary files
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

# Set correct permissions
RUN chown -R nextjs:nodejs .

USER nextjs

EXPOSE 3010

ENV PORT 3010
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]