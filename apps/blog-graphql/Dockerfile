FROM node:18-alpine AS base


FROM base AS builder
WORKDIR /usr/src/app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/blog-graphql --docker


FROM base AS installer
WORKDIR /usr/src/app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm install
# Build the project
COPY --from=builder /usr/src/app/out/full/ .
RUN npx turbo run build --filter=@apps/blog-graphql...
# Prune unused dependencies
RUN npm prune --production
RUN rm -rf node_modules/typescript


FROM base AS runner
WORKDIR /usr/src/app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 graphql
USER graphql

COPY --from=installer /usr/src/app/apps/blog-graphql/package.json .
COPY --from=installer --chown=graphql:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=graphql:nodejs /usr/src/app/apps/blog-graphql/dist ./dist
COPY --from=installer --chown=graphql:nodejs /usr/src/app/apps/blog-graphql/prisma ./prisma

EXPOSE 8080
CMD ["npm", "run", "start:prod"]
