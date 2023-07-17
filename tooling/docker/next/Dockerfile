FROM node:18-alpine AS base
WORKDIR /app

ARG APP_NAME

FROM base AS turbo
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/${APP_NAME} --docker

# Separate step to install dependencies, most of this will be cached if dependencies wont change
FROM base AS builder
# Building Next requires building node-gyp modules. These require python to build which is not present in alpine.
RUN apk add --no-cache python3 make g++ libc6-compat
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
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
# https://stackoverflow.com/questions/70096208/dockerfile-copy-folder-if-it-exists-conditional-copy
COPY --from=builder --chown=nextjs:nodejs app/apps/${APP_NAME}/publi[c] ./apps/${APP_NAME}/public

WORKDIR /app/apps/${APP_NAME}

CMD node server.js
