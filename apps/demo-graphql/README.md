# GraphQl Demo Package

This is a demo Turbo package that demonstrates the integration of GraphQL, Clerk authentication, Prisma, and NestJS within the Turbo application framework.

## Environment Variables

1. **`NODE_ENV`**: Specifies the current environment for the application. It can be set to `development`, `production`, or `test`.

2. **`DATABASE_URL`**: The connection string for the PostgreSQL database, which includes the username, password, host, port, database name, and schema. Make sure to replace the placeholders with your actual database credentials.

3. **`CLERK_JWSK_URL`**: The URL for the Clerk JSON Web Key Set (JWKS), which is used to verify JWT tokens issued by Clerk. This URL is unique for each Clerk application.

4. **`CLERK_ISSUER`**: The URL for the Clerk issuer, which is used to verify the JWT tokens' issuer. This URL is also unique for each Clerk application.

## Example Configuration

Create a `.env` file in your project's root directory and set the environment variables with the appropriate values:

```dotenv
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=public
CLERK_JWSK_URL=https://your_clerk_subdomain.clerk.accounts.dev/.well-known/jwks.json
CLERK_ISSUER=https://your_clerk_subdomain.clerk.accounts.dev

```

## Overview

The package contains the following files:

1. **app.module.ts**: The main module file that imports and configures the necessary modules and providers for the application.
2. **app.controller.ts**: The main controller file that handles incoming requests.
3. **app.service.ts**: The main service file that provides the core functionality of the application.
4. **todo.service.ts**: A service that provides CRUD operations for Todo entities.
5. **todo.resolver.ts**: A GraphQL resolver that handles Todo-related queries and mutations.
6. **auth.guard.ts**: A NestJS authentication guard that uses JWT tokens.
7. **jwt.strategy.ts**: A Passport strategy that handles JWT token validation.

## AppModule (`app.module.ts`)

The `AppModule` imports and configures the necessary modules and providers for the application. It includes the `ConfigModule`, `GraphQLModule`, and various services and guards.

## JwtStrategy (`jwt.strategy.ts`)

The `JwtStrategy` extends Passport's `Strategy` and is used for handling JWT token validation. It uses the `jwks-rsa` library to fetch the public key for verifying the tokens issued by Clerk.

## JwtAuthGuard (`auth.guard.ts`)

The `JwtAuthGuard` extends NestJS's `AuthGuard` and is used to protect GraphQL endpoints that require authentication. It retrieves the request context from the GraphQL execution context and uses the `JwtStrategy` for token validation.

## TodoResolver (`todo.resolver.ts`)

The `TodoResolver` is a GraphQL resolver that handles Todo-related queries and mutations. It uses the `JwtAuthGuard` to protect the `todos` query, ensuring that only authenticated users can fetch the list of todos. The resolver also provides mutations for creating, updating, and deleting todos.

Make sure to set the environment variables correctly in a `.env` file or your hosting environment before running the application.