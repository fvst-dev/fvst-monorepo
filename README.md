# Monorepo started template

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
