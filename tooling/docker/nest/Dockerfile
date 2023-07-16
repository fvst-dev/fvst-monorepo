FROM node:18-alpine AS base
WORKDIR /app

ARG APP_NAME
# These arguments enable remote cacheing inside docker build
ARG TURBO_TOKEN
ARG TURBO_TEAMID
ARG TURBO_API

# Separate step to get a pruned version of the monorepository for just a single project - this will be rarely cached
FROM base AS builder
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/${APP_NAME} --docker

# Separate step to install dependencies, most of this will be cached if dependencies wont change
FROM base AS installer
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install
# Then copy over the application files (change often, no longer cached from this step on)
COPY --from=builder /app/out/full/ .
# Build the project
RUN npx turbo run build -vvv --filter=@apps/${APP_NAME}
# Prune unused dependencies
RUN npm prune --production
RUN rm -rf node_modules/typescript

FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
RUN chown -R user:nodejs /app
USER user

COPY --from=installer --chown=user:nodejs /app .

WORKDIR /app/apps/${APP_NAME}

CMD npm run db:migrate:deploy && node ./dist/main.js
