# FVST Monorepo

Most startups start with a monolithical application and when their business picks up and they outgrow
the monolith the migration to microservices starts. This migration is usually painful.

This repositories goal is to simplify microservices architecture and enable companies to still start with a monolith, but have an easy path to add new services without having to change much.

We use GCP as the cloud provider - it provides an extensive free tier to get started - https://cloud.google.com/free/

## Getting started

### Install global dependencies

- Github CLI - `brew install gh` - Used for managing secrets and variables in Github actions
- Google cloud SDK - `brew install --cask google-cloud-sdk` - Used to setup projects on GCP.
  - Make sure the SDK is up to date by running `gcloud components update`
- Terraform `brew install terraform` - Used to manage infrastructure as code

### Setup GCP

- `npm install`
- `npx fvst infra init` - This CLI script will guide you through setting up the infrastructure on GCP.
  - You have to set up a billing account - follow the tutorial at https://cloud.google.com/billing/docs/how-to/create-billing-account - this step asks for a credit card, but GCP will not charge the account when the free trial runs out.
  - This step will take some time, it will create 2 projects (staging/production), build docker containers and deploy them.
- Setup a clerk.com account following the tutorial at [Setup Clerk application](docs/clerk/Setup Clerk application.md)
  - You should have one account for staging and one account for production
- Wait for the `npx fvst infra init` script and the workflow it starts on GitHub actions to finish
  - The workflow will fail - we're unsure why it fails, it seems like GCP IAM policy is not applied on the first run.
  - This is ok, we still need to configure the secrets for Clerk
- `npx fvst infra setup-secrets staging` - This scripts updates the secret values for the staging environment, you should do the same for production.
  - [How to get the CLERK_ISSUER value](docs/clerk/Get CLERK_ISSUERS value.md)
  - [How to get the CLERK_JWSK_URL value](docs/clerk/Get CLERK_JWSK_URL value.md)
  - [How to get the CLERK_PUBLISHABLE_KEY value](docs/clerk/Get CLERK_PUBLISHABLE_KEY value.md)
  - [How to get the CLERK_SECRET_KEY value](docs/clerk/Get CLERK_SECRET_KEY value.md)
- Rerun the failed jobs from the Github Actions workflow
- Open `https://console.cloud.google.com/welcome/`
  - Choose one of the projects created from the top
  - Choose `Cloud run` from the navigation menu on the left
  - You should be greeted with the following screen ![](https://gcdnb.pbrd.co/images/hlHko6NmevNp.png?o=1)

### Setup local development

- `npx fvst dev init` - This scripts loads the secret values from staging and populates the .env files with them for local development
- `docker compose up` - Brings up postgres & redis
- `npm run dev` - brings up all applications
- Go to `http://localhost:3000/` and you should be greeted with the following screen ![](https://gcdnb.pbrd.co/images/qfIur8N7nytk.png?o=1)

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

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| npm run lint   | Runs prettier, eslint and tsc (checks types) |
| npm run format | Runs prettier and eslint --fix               |
| npm run dev    | Starts the dev environment for all apps      |
| npm run build  | Builds all the apps and packages             |
| npm run test   | Runs the test suite                          |
