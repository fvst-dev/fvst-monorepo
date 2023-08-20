# FVST Monorepo

Most startups start with a monolithical application and when their business picks up and they outgrow
the monolith the migration to microservices starts. This migration is usually painful.

This repositories goal is to simplify microservices architecture and enable companies to still start with a monolith, but have an easy path to add new services without having to change much.

We use GCP as the cloud provider - it provides an extensive free tier to get started - https://cloud.google.com/free/

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
