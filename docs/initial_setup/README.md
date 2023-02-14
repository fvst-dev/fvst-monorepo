# FVST

## Initial Setup instructions

> NB! Before starting, you need accounts with
>
> - https://cloud.google.com
> - https://studio.apollographql.com/login

Apollo studio account is free for up to 10M requests per month and you will use the request counter only for development or QA to validate the schema. Production users will not use these requests

Google clould has a trial account to get started.

## Apollo Studio Setup

1. Create a new supergraph by providing a schema manually.
2. Create a sample variant of the supergraph and click on the variant.
3. Click on the settings cog in the left lower menu
4. Click on the This Graph menu and then navigate to API keys.
5. You should see this information there: ![apollo-key](apollo-setup.png)
6. Name the key Github Actions Key and save it locally

## Google Cloud Setup

1. Choose a company top level account
2. Nagigate to IAM & Admin and click the Manage Resources on the left menu
3. Create a folder under the company name where all environments will go
4. Create a new service account (can be under any project)
5. Click on the service account and export a key for this account (it will download locally)
6. Go back to the company view and add the new service account roles to
   - Create new projects under the previously created folder
   - Link projects to a billing account
   - Create folders
   - Create / modify / list SQL instances
   - Create / modify / list Cloud Run services.
7. To get the base64 encoded key, do the following (replace KEY_FILE.json with the file path to your downloaded key). The reason for using awk is to convert multiline json to a single line (multiline json can cause issues in github actions)

```
    awk -v RS= -v OFS= '{$1=$1}1' KEY_FILE.json | base64
```

## Run the init github action

1. Navigate to github actions
2. Click on Initial Setup action
3. Choose run workflow
4. Enter the Apollo studio Github actions key from above
5. Enter your github actions key (this can be found in developer settings of your github account). This needs to have permissions to add/modify github secrets for the repository
6. Enter the graph id from apollo studio. This should be just the id part without the variant. So if you see a name like fvst-main@google-cloud in apollo studio, only put in the fvst-main part
7. enter the base64 encoded google key from previous step
8. Enter the billing account id of the google cloud. This account will pay for the environments and it can be found here: ![billing-account](billing-account-id.png)
9. Enter the id of the folder where the projects should go. The id is a long integer number found in resource management
10. Choose a region for deployment and click run workflow

This will create 2 projects for staging and production and provision PostgreSQL databases
for each project. Both environments will use the same passwords by default for simplicity, but you should change them in github secrets before going to actual production.

Now, you can merge to stg and prod branches and mono repo projects that are specified in the matrix for the branch builds will be deployed into their respective repositories.
