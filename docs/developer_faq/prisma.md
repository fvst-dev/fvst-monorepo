# Prisma in monorepo

Prisma is not intended to be used in a monorepo with multiple `schema.prisma` files nor with multiple databases.

This is due to the Prisma client that gets generated based on each project's schema files.

There is a workaround that allows us to use multiple databases and even multiple `schema.prisma` files in one single
monorepo.

## How the workaround works

In each `schema.prisma` file options there is the client generation options. The option we want to access is the output.
For example:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/@~internal/prisma_demo/client"
}
```

In here we have defined that it would generate into each projects node_modules folder. Note the directory that comes
after `@~internal`. This needs to be changed per project.

This ensures that each project will get their own prisma client, and IDE IntelliSense doesn't get too confused which
client it should reference. This is still considered a workaround until Prisma adds monorepo and multiple db support.

# Containerization

Even though putting Prisma in a Docker container is straightforward, there can be some problems with it.

### Client generation

Although Prisma tries to automatically detect the system it is trying to generate a client for, sometimes it fails. As
such, there is an option to manually specify the targets he can create a binary for.

This is done with the `binaryTargets` option

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native"]
}
```

You can find the more in depth explanation behind
this [here](https://www.prisma.io/docs/concepts/components/prisma-schema/generators).

You can find the binaries Prisma can generate
for [here](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#binarytargets-options)

### NPM scripts

Make sure to run Client generation before the start script. This is due to the workaround, as the application won't have
the prisma client in the correct folder.

Most backend Nest apps have the following scripts that would handle the required generation and migration of any
migrations.

```json
{
  "scripts": {
    "start:prod": "npm run generate && npm run db:migrate:deploy && node dist/main",
    "generate": "prisma generate",
    "db:migrate:deploy": "prisma migrate deploy"
  }
}
```
