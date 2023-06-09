FROM node:18-alpine AS base

FROM base AS builder
WORKDIR /usr/src/app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/web --docker
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY


FROM base AS installer
# Installing Next requires building node-gyp modules. These require python to build which is not present in alpine.
RUN apk add --no-cache python3 make g++
WORKDIR /usr/src/app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm install
# Build the project
COPY --from=builder /usr/src/app/out/full/ .
RUN npx next telemetry disable
RUN npx turbo run build --filter=@apps/web...


FROM base AS runner
WORKDIR /usr/src/app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /usr/src/app/apps/web/next.config.js .
COPY --from=installer /usr/src/app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/web/.next/static ./apps/web/.next/static
# Uncomment to copy static files from NextJS /public folder
#COPY --from=installer --chown=nextjs:nodejs /usr/src/app/apps/web/public ./apps/web/public

EXPOSE 8080
CMD node apps/web/server.js
