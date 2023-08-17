# FVST Monorepo

Most startups start with a monolithical application and when their business picks up and they outgrow
the monolith the migration to microservices starts. This migration is usually painful.

This repositories goal is to simplify microservices architecture and enable companies to still start with a monolith, but have an easy path to add new services without having to change much.

We use GCP as the cloud provider - it provides an extensive free tier to get started - https://cloud.google.com/free/

## Getting started

### Copy this repository template

**1. Click "Use this template"**

![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-08-17/2a6445cf-d3a9-4765-bd37-fe333c8df258/ascreenshot.jpeg?tl_px=1736,324&br_px=3456,1285&force_format=png&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=538,276)

**2. Click Create new repository**

![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-08-17/c3ba8cd7-c5f3-44cf-9618-aa7a9f548ba4/ascreenshot.jpeg?tl_px=1736,372&br_px=3456,1333&force_format=png&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=540,277)

**3. Include all branches**

![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-08-17/0c0d572c-75a1-4c5f-aa48-dda5841d7b77/ascreenshot.jpeg?tl_px=1245,561&br_px=2965,1522&force_format=png&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=524,277)

**4. Give your repository a name**

![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-08-17/3539b28c-8db7-444b-b199-c789ab218192/ascreenshot.jpeg?tl_px=1457,759&br_px=3177,1720&force_format=png&width=1120.0&wat=1&wat_opacity=0.7&wat_gravity=northwest&wat_url=https://colony-recorder.s3.us-west-1.amazonaws.com/images/watermarks/FB923C_standard.png&wat_pad=524,277)

**6. Click "Create repository"**

**7. Checkout your repository**

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
- Setup a clerk.com account following the tutorial at [Setup Clerk application](./docs/clerk/setup_clerk_application.md)
  - You should have one account for staging and one account for production
- Wait for the `npx fvst infra init` script and the workflow it starts on GitHub actions to finish
  - The workflow will fail - we're unsure why it fails, it seems like GCP IAM policy is not applied on the first run.
  - This is ok, we still need to configure the secrets for Clerk
- `npx fvst infra setup-secrets staging` - This scripts updates the secret values for the staging environment, you should do the same for production.
  - [How to get the CLERK_ISSUER value](./docs/clerk/get_clerk_issuers_value.md)
  - [How to get the CLERK_JWSK_URL value](./docs/clerk/get_clerk_jwsk_url_value.md)
  - [How to get the CLERK_PUBLISHABLE_KEY value](./docs/clerk/get_clerk_publishable_key_value.md)
  - [How to get the CLERK_SECRET_KEY value](./docs/clerk/get_clerk_secret_key_value.md)
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
