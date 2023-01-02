# FVST

## Folder explanations

| Folder name | What goes inside of it                                                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| apps        | All backend and frontend apps                                                                                                                        |
| frameworks  | In this folder we keep frameworks like Jest that require quite a bit of configuration to get up and running and can be used across multiple projects |
| packages    | Here we keep code that we want to re-use across apps                                                                                                 |
| tooling     | Here we have all the configuration code for all the tooling we use inside the monorepository                                                         |

## NPM Scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| npm run lint   | Runs prettier, eslint and tsc (checks types) |
| npm run format | Runs prettier and eslint --fix               |
| npm run docker | Runs the docker composes in each package     |
| npm run dev    | Starts the dev environment for all apps      |
| npm run build  | Builds all the apps and packages             |
| npm run test   | Runs the test suite                          |

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
