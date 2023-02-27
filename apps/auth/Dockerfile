FROM --platform=linux/amd64 node:18.14.1-bullseye-slim AS builder
# Set working directory
WORKDIR /usr/src/app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/auth --docker

# Add lockfile and package.json's of isolated subworkspace
FROM --platform=linux/amd64 node:18.14.1-bullseye-slim AS installer
WORKDIR /usr/src/app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm install

# Build the project
COPY --from=builder /usr/src/app/out/full/ .
RUN npx turbo run build --filter=@apps/auth...


FROM --platform=linux/amd64 node:18.14.1-bullseye-slim AS runner
WORKDIR /usr/src/app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 graphql

RUN mkdir -p /usr/src/app/src
RUN chown graphql:nodejs /usr/src/app/src

USER graphql

COPY --from=installer /usr/src/app/apps/auth/package.json .

COPY --from=installer --chown=graphql:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=graphql:nodejs /usr/src/app/apps/auth/dist ./dist
COPY --from=installer --chown=graphql:nodejs /usr/src/app/apps/auth/dist/prisma ./prisma

RUN npx prisma generate

EXPOSE 8080
CMD ["npm", "start"]
