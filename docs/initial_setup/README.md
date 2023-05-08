# FVST

## Initial Setup instructions

> NB! Before starting, you need accounts with
>
> - https://cloud.google.com
> - https://studio.apollographql.com/login
> - https://clerk.com/

- Google Cloud has a trial account with $300 credit to get started.
- Apollo studio account is free for up to 10M requests per month, and you will use the request counter only for
  development or QA to validate the schema. Production users will not use these requests
- Clerk has a very generous free tier, up to 5,000 monthly active users and unlimited sign-ins.

## Clerk setup

Clerk is quite straightforward to set up and is done via signing up for the service. We discuss the longer setup in the
[authentication](authentication.md) readme file.

## Apollo Studio Setup

1. Create a new supergraph by providing a schema manually.
2. Create a sample variant of the supergraph and click on the variant.
3. Click on the settings cog in the left lower menu
4. Click on the `This Graph` menu and then navigate to API keys.
5. You should see this information there: ![apollo-key](apollo-setup.png)
6. Name the key GitHub Actions Key and save it locally

## Google Cloud Setup

1. Choose the company top level account.
2. Navigate Manage Resources menu which can be found in the IAM & Admin panel, or by searching
3. Create a folder under the company where all environments will go
4. Create a new project with your name and enable the following APIs for it:
   - Service Usage API
   - Cloud Resource Manager API
   - Cloud SQL Admin API
   - Cloud Billing API
5. Create a new service account (can be under any project)
6. Click on the service account and export a key for this account (it will download locally)
7. Go back to the company view and add the new service account roles to
   - Create new projects under the previously created folder
   - Link projects to a billing account (These permissions need to be on the organization level, not on the folder level to work)
   - Create folders
   - Create / modify / list SQL instances
   - Create / modify / list Cloud Run services.
8. Generate a key for this service account and save it on your device
9. Change the json key to base64, to do this, do the following:
   - Remove the first and last space in the JSON file.
   - Run the following command. Replace KEY_FILE.json to whatever the downloaded filename was, or vice versa change the
     downloaded file.

```
awk -v RS= '{$1=$1}1' KEY_FILE.json | base64
```

10. Save the key into a new textfile should you need to enter it more than once.
    - This will also help you debug should the transform not complete correctly and there is errors connecting to Google Cloud via API.

```
base64 --decode output.txt > ORIGINAL_KEY.json
```

> The reason for converting to base 64 is multiline json can cause issues in GitHub actions.

## Run the init GitHub action

1. Navigate to GitHub actions
2. Click on Initial Setup action
3. Choose run workflow
4. Enter the Apollo studio GitHub actions key from above.
   - You can skip Apollo if you don't have a running graph and edit the secret later from Github repo secrets.
5. Enter your GitHub actions key (this can be found in developer settings of your GitHub account). This needs to have
   permissions to add/modify GitHub secrets for the repository
6. Enter the graph id from apollo studio. This should be just the id part without the variant. So if you see a name like
   fvst-main@google-cloud in apollo studio, only put in the fvst-main part
7. enter the base64 encoded google key from previous step
8. Enter the billing account id of the Google cloud. This account will pay for the environments, and it can be found
   here: ![billing-account](billing-account-id.png)
9. Enter the id of the folder where the projects should go. The id is a long integer number found in resource management
10. Choose a region for deployment and click run workflow

This will create 2 projects for staging and production and provision PostgresSQL databases
for each project. Both environments will use the same passwords by default for simplicity, but you should change them in
GitHub secrets before going to actual production.

Now, you can merge to stg and prod branches and mono repo projects that are specified in the matrix for the branch
builds will be deployed into their respective repositories.

You can edit these branches and all the strategies in the `.github/workflows/main.yml`.

## Add environment values to secrets on Google Cloud

1. Enable Secret Manager
2. Create all the secrets required for the services, configure rotation, encryption and expiration as necessary.
3. To enable usage, select a service in Cloud Run.
4. Deploy a new revision of a service via `Edit & Deploy new revision`. ![deploy-new-revision](deploy-new-revision.png)
5. Add the environment variables via the `Secrets` section. Expose the secrets as environment variables.
6. Deploy the new revision. These will now carry over to all new deployments.
