FROM --platform=linux/amd64 node:18.14.1-bullseye-slim AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /usr/src/app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM --platform=linux/amd64 node:18.14.1-bullseye-slim AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /usr/src/app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN npx turbo run build --filter=web...


FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 8080
CMD node apps/web/server.js
