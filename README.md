# FVST Monorepo

The FVST Monorepo is a monorepository project based on Turborepo. You can read more about Turborepo
[here](https://turbo.build/repo/docs).

The core applications are based on [NestJS](https://docs.nestjs.com/) for the backend
and [NextJS](https://nextjs.org/docs) for the frontend. For the backend demo application we show both REST and GraphQL
implementations for constructing and communicating with the front end. Our GraphQL implementation is based on Apollo,
and we use [Federation](https://www.apollographql.com/docs/federation) to join different services and their respective
sub-graphs together.

## Folder structure

The root of the Monorepo contains the turborepo configuration files, and the main package.json which defines the
directories and scripts used in the Monorepo. The directories set up in the template are following this structural
logic.

| Directory | What goes inside of it                                                                       |
| --------- | -------------------------------------------------------------------------------------------- |
| apps      | All backend and frontend apps                                                                |
| packages  | Here we keep code that we want to re-use across apps                                         |
| tooling   | Here we have all the configuration code for all the tooling we use inside the monorepository |

## NPM Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| npm run lint    | Runs prettier, eslint and tsc (checks types) |
| npm run format  | Runs prettier and eslint --fix               |
| npm run dev     | Starts the dev environment for all apps      |
| npm run build   | Builds all the apps and packages             |
| npm run test    | Runs the test suite                          |
| npm run prepare | Prepares Husky in the repository             |

## Set up

The application scripts are set up in [package.json](package.json) with additional Turborepo related addons declared
in [turbo.json](turbo.json). As such, commands can be run both inside separate applications and from the root directory.
If run from the application directory, then it affects only the application and when run from the root, it will affect
all applications that have the script with the same name in their definitions.

By default, all npm scripts in the root run the respective turbo scripts which run all application scripts.

To start, install all npm packages with `npm install` from the root directory. Run `docker compose up` to run the
required Postgres/Redis instances.

Next go to each application in the `/apps` directory and copy their respective `.env.example` files into `.env` files.

> Note that **NextJS** uses both **.env** and **.env.local** as the files it checks for environment variables. It is
> better to use **.env.local** as that is the first preferred location for NextJS to look.

To run all applications, just run `npm run dev` and that will start all the applications. You can also run each
application separately if you navigate into the directory of the application and run the command directly from there.

### Authentication

Go to https://clerk.com/ and:

- Register an account
- Open their dashboard
- Add a new application
- Go to `JWT Templates` and add a new `Blank` template
  - Under `Claims` add `{ "userId": "{{user.id}}" }`
  - The `Issuer` field value goes under `process.env.CLERK_ISSUER`
  - The `JWKS Endpoint` field value goes under `process.env.CLERK_JWSK_URL`

## Troubleshooting

When adding new applications/tooling/packages, changing their directory names or moving them, npm can get confused on
where the package itself is located. To remedy these situations it is required sometime after these actions to delete
all the `node_modules` directories as well as the `package-lock.json` file in the root of the monorepository.

After that, run `npm install` at the root of the mono repository and an updated `package-lock.json` file will be
generated representing the new Monorepo structure.
