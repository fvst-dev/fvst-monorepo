FROM node:18-alpine AS base

ARG APP_NAME
ARG TURBO_TOKEN
ARG USE_PRISMA

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/${APP_NAME} --docker


FROM base AS installer
WORKDIR /app
# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json

RUN npm install
COPY --from=builder /app/out/full/ .

ENV TURBO_TOKEN=${TURBO_TOKEN}
COPY turbo.json ./
COPY .turbo/config.json ./.turbo/
COPY .git/ ./.git/
# Build the project
RUN npx turbo run build --filter=@apps/${APP_NAME}...
RUN rm -rf .git

# Prune unused dependencies
RUN npm prune --production
RUN rm -rf node_modules/typescript


FROM base AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
RUN chown -R user:nodejs /app
USER user

COPY --from=installer --chown=user:nodejs /app .

WORKDIR /app/apps/${APP_NAME}

CMD npm run db:migrate:deploy && node ./dist/main.js
