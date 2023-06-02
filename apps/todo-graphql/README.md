# GraphQl Demo Package

This is a example back-end project that demonstrates the integration of GraphQL, Clerk authentication, Prisma, and
NestJS within the Turbo application framework.

- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs)
- [Clerk](https://clerk.com/docs)

## Setup

### Overview

The package contains the following files:

1. **app.module.ts**: The main module file that imports and configures the necessary modules and providers for the
   application.
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

1. **`NODE_ENV`**: Specifies the current environment for the application. It can be set to `development`, `production`,
   or `test`.

2. **`DATABASE_URL`**: The connection string for the PostgreSQL database, which includes the username, password, host,
   port, database name, and schema. Make sure to replace the placeholders with your actual database credentials.

3. **`CLERK_JWSK_URL`**: The URL for the Clerk JSON Web Key Set (JWKS), which is used to verify JWT tokens issued by
   Clerk. This URL is unique for each Clerk application.

4. **`CLERK_ISSUER`**: The URL for the Clerk issuer, which is used to verify the JWT tokens' issuer. This URL is also
   unique for each Clerk application.

To set up the environment variables copy the `.env.example` file into `.env` file.

## File descriptions

### AppModule (`app.module.ts`)

The `AppModule` imports and configures the necessary modules and providers for the application. It includes
the `ConfigModule`, `GraphQLModule`, and various services and guards.

### JwtStrategy (`jwt.strategy.ts`)

The `JwtStrategy` extends Passport's `Strategy` and is used for handling JWT token validation. It uses the `jwks-rsa`
library to fetch the public key for verifying the tokens issued by Clerk.

### JwtAuthGuard (`auth.guard.ts`)

The `JwtAuthGuard` extends NestJS's `AuthGuard` and is used to protect GraphQL endpoints that require authentication. It
retrieves the request context from the GraphQL execution context and uses the `JwtStrategy` for token validation.

### TodoResolver (`todo.resolver.ts`)

The `TodoResolver` is a GraphQL resolver that handles Todo-related queries and mutations. It uses the `JwtAuthGuard` to
protect the `todos` query, ensuring that only authenticated users can fetch the list of todos. The resolver also
provides mutations for creating, updating, and deleting todos.

Make sure to set the environment variables correctly in a `.env` file or your hosting environment before running the
application.
