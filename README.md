# FVST

## Initial Setup instructions

**_1. Configure your cloud env_**

Follow the guide here: [Cloud Setup](docs/initial_setup/README.md)

**_2. Install rover CLI (for schema repository sync)_**

```
npm install -g @apollo/rover
```

**_3. Copy .env.example into .env in the root of the project and configure your values_**

## Local Development with gateway

Before starting the gateway, please run

```
npm run publishSchema
```

This will publish the current schema with your env name to apollo studio. After that, gateway can be started locally.

The gateway is part of the local docker compose file. After you populate the .env file, you can start the docker compose (from root directory of the project, so docker can pass the variables from .env to the container).
Once started, it will start listening on port 4000 and you can link your frontend to that port.

If you change the schema of any of the apps, run

```
npm run publishSchema
```

and wait a few seconds. The gatway will resync the schema from apollo studio and you will get the latest one. No restarts are required in case of schema changes.

## Folder explanations

| Folder name | What goes inside of it                                                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| apps        | All backend and frontend apps                                                                                                                        |
| frameworks  | In this folder we keep frameworks like Jest that require quite a bit of configuration to get up and running and can be used across multiple projects |
| packages    | Here we keep code that we want to re-use across apps                                                                                                 |
| tooling     | Here we have all the configuration code for all the tooling we use inside the monorepository                                                         |

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

    "lint": "npm run lint:eslint && npm run lint:prettier",
    "lint:eslint": "npx eslint --cache --cache-location=./.eslintcache --cache-strategy=content ./src",
    "lint:prettier": "prettier --check \"src/**/*.{ts,tsx,md,js,jsx}\"",
    "lint:typescript": "tsc --noEmit -p ./tsconfig.check.json",

    "format": "npm run format:prettier && npm run format:eslint",
    "format:prettier": "prettier --write \"src/**/*.{ts,tsx,md,js,jsx}\"",
    "format:eslint": "npx eslint ./src --fix",

    "build": "NODE_ENV=production webpack",
    "build:dev": "NODE_ENV=development webpack",
    "build:start": "cd dist && PORT=8080 npx serve",

    "start": "NODE_ENV=development webpack serve --open",
    "start:live": "NODE_ENV=development webpack serve --open --live-reload --hot",

    "test": "jest --coverage --maxWorkers=40% --maxConcurrency=5",
    "test:ci": "jest --coverage --maxWorkers=2"

## Graphql schema management

1. Put schemas into APP_NAME/src/graphql/schema/schema.graphql files
2. Configure PORT in .env for the app
3. Configure a env name for yourself in .env (APOLLO_GRAPH_REF value). The code after @ must be unique for your dev box
4. Run the npm run publishSchema (this publishes the schema for your env to apollo studio)
5. Run docker compose file. It will expose the sandbox on port 4000
6. Temp
