# FVST Monorepo Demo

This is an example REST back-end project that uses:

- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs)

## Setup

### Overview

The package contains the following files:

1. **app.module.ts**: The main module file that imports and configures the necessary modules and providers for the application.
2. **app.controller.ts**: The main controller file that handles incoming requests.
3. **app.service.ts**: The main service file that provides the core functionality of the application.
4. **todo.service.ts**: A service that provides CRUD operations for Todo entities.
5. **todo.resolver.ts**: A GraphQL resolver that handles Todo-related queries and mutations.
6. **auth.guard.ts**: A NestJS authentication guard that uses JWT tokens.
7. **jwt.strategy.ts**: A Passport strategy that handles JWT token validation.

### Install

To set up the project you can run `npm install` here or either in the root of the monorepository. This installs all the
`node_modules` to run the application.

You might need to generate the prisma types after install, for this run `prisma generate`. This command is built into
the post-install process, so it should run right after you have run `npm install`.

## Environment Variables

1. **`NODE_ENV`**: Specifies the current environment for the application. It can be set to `development`, `production`, or `test`.

2. **`DATABASE_URL`**: The connection string for the PostgreSQL database, which includes the username, password, host, port, database name, and schema. Make sure to replace the placeholders with your actual database credentials.

To set up the environment variables copy the `.env.example` file into `.env.local` file.

### Running the application

Ensure you have a Postgres instance running and run `prisma migrate deploy` to run all the migrations.

To run the application in dev just use the script `npm run dev`.

### Development commands

Any changes to the Prisma schema should be cleaned up via `prisma format`. This is built into the format script.

To make any new prisma migrations the script for it is `prisma migrate dev --name <NAME_OF_MIGRATION>`.
