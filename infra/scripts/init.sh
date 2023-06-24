#!/bin/bash

usage()
{
cat << EOF
usage: $0 options

Init everything script:

OPTIONS:
   -r      region to use
   -p      prefix to use for projects
EOF
}

if [ $# -eq 0 ]
  then
    usage
    exit 0
fi
# Parse flags
while getopts r:p: flag
do
    case "${flag}" in
        r)
          region=${OPTARG}
          ;;
        p)
          prefix=${OPTARG}
          ;;
        *)
          usage
          exit 0
          ;;
    esac
done
# Validate that required arguments exist
if [ -z "$region" ]
then
      echo "Region is a required variable"
      exit 1
fi

if [ -z "$prefix" ]
then
      echo "Prefix is a required variable"
      exit 1
fi

envs=(staging production)
for env in "${envs[@]}";
do
  echo "About to create ${prefix}-fvst-${env} environment in region ${region}"
done

read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  gcloud auth login
  gh secret set FVST_PROJECT_PREFIX --app actions --body "${prefix}"
  gh secret set GH_TOKEN --app actions --body "$(gh auth token)"

  for env in "${envs[@]}";
  do
    project="${prefix}-fvst-${env}"
    env_uppercase=$(echo "$env" | tr a-z A-Z)
    echo "Creating project ${project} in region ${region}"

    gcloud projects create "$project"
    gcloud config set project "$project"
    gcloud auth application-default login

    ### Create service account for github actions
    gcloud iam service-accounts create sa-gh-"$project" \
      --description="Github Actions service account for $project Environment" \
      --display-name="Github Actions Service Account"
    gcloud projects add-iam-policy-binding "$project" \
      --member="serviceAccount:sa-gh-$project@$project.iam.gserviceaccount.com" \
      --role="roles/editor"

    ### Create a key for service account and store it in github secrets
    gcloud iam service-accounts keys create GH_ACTIONS_KEY.json --iam-account=sa-gh-"$project"@"$project".iam.gserviceaccount.com
    gh secret set "GOOGLE_CLOUD_TOKEN_$env_uppercase" --app actions --body "$( jq -c . < GH_ACTIONS_KEY.json | base64)"
    rm GH_ACTIONS_KEY.json

  done
fi

