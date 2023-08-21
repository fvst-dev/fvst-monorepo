# FVST Monorepo

Most startups start with a monolithical application and when their business picks up and they outgrow
the monolith the migration to microservices starts. This migration is usually painful.

This repositories' goal is to simplify microservices architecture and enable companies to still start with a monolith, but have an easy path to add new services without having to change much.

We use GCP as the cloud provider - it provides an extensive free tier to get started - https://cloud.google.com/free/

## Features

- 100% customizable to your needs - just copy this repository template and make your own changes.
- Community driven
  - Have an idea to make it better for everyone? Start a [discussion](https://github.com/fvst-dev/fvst-monorepo/discussions) or open a [PR](https://github.com/fvst-dev/fvst-monorepo/pulls)!
  - Not sure how to achieve something or confused on how something is built? Ask a [question](https://github.com/fvst-dev/fvst-monorepo/discussions/categories/q-a) and we'll help you out!
- [Monorepo](https://semaphoreci.com/blog/what-is-monorepo) pattern to keep all your code in one place and have your team work on a single source of truth.
  - Easy to add new services without the headache of configuring a new repository
  - Easy to share code between services without having to manage separate NPM libraries
  - Easy to run locally, just start the docker compose file and run npm run dev to bring the entire stack up.
- CLI baked into the repository to automate complex workflows.
  - Easy to add your own custom commands that your team can utilize.
- Infrastructure as code, allowing you to easily and quickly set up your environments. We leverage the following in our infrastrucutre:
  - [Cloud SQL](https://cloud.google.com/sql) - Relational storage
  - [Redis](https://cloud.google.com/memorystore) - In memory data storage / queues
  - [Artifact registry](https://cloud.google.com/artifact-registry) - Hosting your docker containers
  - [Cloud storage](https://cloud.google.com/storage) - Hosting terraform state / turborepo remote cache
  - [Secret manager](https://cloud.google.com/secret-manager) - Securely storing your secrets (e.g. API keys)
  - [Cloud run](https://cloud.google.com/run) - Deploying docker containers
- Github Action CI workflows
  - [Continuous Delivery](https://continuousdelivery.com/)
    - Build new docker containers from code
    - Deploy docker containers to google cloud
  - Validate your entire codebase in each pull request
  - Get a terraform plan in each pull request
  - Focus on speed, workflows heavily utilize
    - caches (Utilizes [turborepo remote cache](https://turbo.build/repo/docs/core-concepts/remote-caching) and a [custom cache server](https://github.com/trappar/turborepo-remote-cache-gh-action) to speed up all CI jobs including docker container builds)
    - geolocation (GitHub Action workers are US based, so artifact registry and cloud storage buckets are US based to reduce latency)
    - docker files are configured for speed and small images
- Share tooling configuration across services and packages
  - [Dockerfiles](https://spacelift.io/blog/dockerfile), [ESLint](https://eslint.org/), [Jest](https://jestjs.io/), [Prettier](https://prettier.io/), [Typescript](https://www.typescriptlang.org/)
- Example services implemented using popular technologies
  - [NextJS](https://nextjs.org/), [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), [Bull MQ](https://github.com/taskforcesh/bullmq), [Graphql](https://www.apollographql.com/apollo-client)
- DX
  - We format modified code on each commit, and it's easy to extend this behaviour to add your own pre-commit validation.

## Documentation

- [Setup](./docs/setup/README.md)
- [Infrastructure overview](./docs/infra/README.md)
- [Branching](./docs/branching/README.md)
- [CI](./docs/ci/README.md)

## Folder structure

The root of the Monorepo contains the turborepo configuration files, and the main package.json which defines the
directories and scripts used in the Monorepo. The directories set up in the template are following this structural
logic.

| Directory | What goes inside of it                                                                       |
| --------- | -------------------------------------------------------------------------------------------- |
| apps      | All backend and frontend apps                                                                |
| packages  | Here we keep code that we want to re-use across apps                                         |
| tooling   | Here we have all the configuration code for all the tooling we use inside the monorepository |
| infra     | Here we have all the infrastructure configuration code to deploy to GCP                      |
| docs      | Documentation                                                                                |

## NPM Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| npm run lint   | Runs prettier, eslint and tsc (checks types) |
| npm run format | Runs prettier and eslint --fix               |
| npm run dev    | Starts the dev environment for all apps      |
| npm run build  | Builds all the apps and packages             |
| npm run test   | Runs the test suite                          |
