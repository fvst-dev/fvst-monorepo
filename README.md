# FVST Monorepo

The FVST Monorepo is a monorepository project based on Turborepo. You can read more about Turborepo
[here](https://turbo.build/repo/docs).

The core applications are based on [NestJS](https://docs.nestjs.com/) for the backend
and [NextJS](https://nextjs.org/docs) for the frontend. For the backend demo application we show both REST and GraphQL
implementations for constructing and communicating with the front end. Our GraphQL implementation is based on Apollo,
and we use [Federation](https://www.apollographql.com/docs/federation) to join different services and their respective
sub-graphs together.

## Monorepo template

The root of the Monorepo contains the turborepo configuration files, and the main package.json which defines the
directories and scripts used in the Monorepo. The directories set up in the template are following this structural
logic.

| Directory  | What goes inside of it                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apps       | All backend and frontend apps                                                                                                                           |
| frameworks | In this directory we keep frameworks like Jest that require quite a bit of configuration to get up and running and can be used across multiple projects |
| packages   | Here we keep code that we want to re-use across apps                                                                                                    |
| tooling    | Here we have all the configuration code for all the tooling we use inside the monorepository                                                            |

## Set up

### Cloud setup instructions

**_Configuring your cloud Environments_**

Follow the guide here to set up environments in GCP and their CI/CD: [Cloud Setup](docs/initial_setup/README.md)

### Local set up

The application scripts are set up in [package.json](package.json) with additional Turborepo related addons declared
in [turbo.json](turbo.json). As such, commands can be run both inside separate applications and from the root directory.
If run from the application directory, then it affects only the application and when run from the root, it will affect
all
applications that have the script with the same name in their definitions.

By default, all npm scripts in the root run the respective turbo scripts which run all application scripts.

To start, install all npm packages with `npm install` from the root directory. Run `docker compose up` to run the
required Postgres/Redis instances. Gateway can be ignored at the start and will be covered later.

Next go to each application in the `/apps` directory and copy their respective `.env.example` files into `.env` files.

> Note that **NextJS** uses both **.env** and **.env.local** as the files it checks for environment variables. It is
> better to use **.env.local** as that is the first preferred location for NextJS to look.

To run all applications, just run `npm run dev` and that will start all the applications. You can also run each
application separately if you navigate into the directory of the application and run the command directly from there.

**_Troubleshooting_**

When adding new applications/tooling/packages, changing their directory names or moving them, npm can get confused on
where the package itself is located. To remedy these situations it is required sometime after these actions to delete
all the `node_modules` directories as well as the `package-lock.json` file in the root of the monorepository.

After that, run `npm install` at the root of the monorepository and an updated `package-lock.json` file will be
generated representing the new Monorepo structure.

### Local Development with gateway

**_Install rover CLI (for schema repository sync)_**

```
npm install -g @apollo/rover
```

**_Copy .env.example into .env in the root of the project and configure your values_**

Before starting the gateway docker, please run the following command in the root directory

```
npm run publishSchema
```

This will publish the current schema with your env name to apollo studio. After that, gateway can be started locally.

The gateway is part of the local docker compose file. After you populate the .env file, you can start the docker
compose (from root directory of the project, so docker can pass the variables from .env to the container).
Once started, it will start listening on port 4000 and you can link your frontend to that port.

If you change the schema any of the apps, run

```
npm run publishSchema
```

and wait a few seconds. The gateway will re-sync the schema from apollo studio and you will get the latest one. No
restarts are required in case of schema changes.

**_Graphql schema management_**

1. Put schemas into APP_NAME/src/graphql/schema/schema.graphql files
2. Configure PORT in .env for the app
3. Configure a env name for yourself in .env (APOLLO_GRAPH_REF value). The code after @ must be unique for your dev
   machine
4. Run the npm run publishSchema (this publishes the schema for your env to apollo studio)
5. Run docker compose file. It will expose the sandbox on port 4000

## NPM Scripts

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| npm run lint          | Runs prettier, eslint and tsc (checks types) |
| npm run format        | Runs prettier and eslint --fix               |
| npm run docker        | Runs the docker composes in each package     |
| npm run dev           | Starts the dev environment for all apps      |
| npm run build         | Builds all the apps and packages             |
| npm run test          | Runs the test suite                          |
| npm run publishSchema | Runs the schema publish to apollo            |
| npm run prepare       | Prepares Husky in the repository             |
