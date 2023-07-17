FROM node:18-alpine AS base
WORKDIR /app

ARG APP_NAME

# Separate step to get a pruned version of the monorepository
FROM base AS turbo
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/${APP_NAME} --docker

# Separate step to install dependencies, most of this will be cached if dependencies wont change
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=turbo /app/out/json/ .
COPY --from=turbo /app/out/package-lock.json ./package-lock.json
# First install only production deps and cache them, then install all deps
RUN --mount=type=cache,target=/var/cache/npm npm install --omit=dev --ignore-scripts && cp -R node_modules node_modules_production && npm install

# Then copy over the application files (change often, no longer cached from this step on)
COPY --from=turbo /app/out/full/ .
# These arguments enable remote cacheing inside docker build
# And they need to be here because the token always changes which stops all further lines from being cached
ARG TURBO_TOKEN
ARG TURBO_TEAMID
ARG TURBO_API
# Build the project
RUN npx turbo run build --filter=@apps/${APP_NAME}
# Switch deps over to production only and prune out not needed files
RUN rm -rf node_modules && mv node_modules_production node_modules && apk --no-cache add curl && curl -sf https://gobinaries.com/tj/node-prune | sh && node-prune

FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
RUN chown -R user:nodejs /app
USER user

COPY --from=builder --chown=user:nodejs /app .

WORKDIR /app/apps/${APP_NAME}

CMD npm run db:migrate:deploy && node ./dist/main.js
