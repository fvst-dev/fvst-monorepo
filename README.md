# FVST

## Initial Setup instructions

### Install Railway CLI

```
npm i -g @railway/cli
railway login
```

### Install rover CLI (for schema repository sync)

```
npm install -g @apollo/rover
```

### Copy .env.example into .env in the root of the project and configure your values

### Add the following secrets to your github repository:

- APOLLO_KEY
- RAILWAY_TOKEN

The railway token can be retrieved like so:

```
cat ~/.railway/config.json | base64
```

if you do not see an output, or see an error, follow previous instructions to do railway login

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
