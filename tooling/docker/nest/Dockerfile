FROM node:18-alpine AS base

ARG APP_NAME
ARG USE_PRISMA

FROM base AS builder
WORKDIR /usr/src/app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=@apps/${APP_NAME} --docker


FROM base AS installer
WORKDIR /usr/src/app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm install
# Build the project
COPY --from=builder /usr/src/app/out/full/ .
RUN npx turbo run build --filter=@apps/${APP_NAME}...
# Prune unused dependencies
RUN npm prune --production
RUN rm -rf node_modules/typescript
# Copy additional files/folders to be used by runner
RUN mkdir ./additional
RUN if [ ! -z "$USE_PRISMA" ]; then cp -R  /usr/src/app/apps/${APP_NAME}/prisma ./additional; fi


FROM base AS runner
WORKDIR /usr/src/app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
RUN chown -R user:nodejs /usr/src/app
USER user

COPY --from=installer /usr/src/app/apps/${APP_NAME}/package.json .
COPY --from=installer --chown=user:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=user:nodejs /usr/src/app/apps/${APP_NAME}/dist ./dist
COPY --from=installer --chown=user:nodejs /usr/src/app/additional/ ./

CMD ["npm", "run", "start:prod"]
