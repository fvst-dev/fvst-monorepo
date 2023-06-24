#!/bin/bash
usage()
{
cat << EOF
usage: $0 options

Init everything script:

OPTIONS:
   -r      region to use (https://cloud.google.com/compute/docs/regions-zones)
   -b      billing account id to use (gcloud beta billing accounts list)
   -p      unique prefix to use for projects
EOF
}

if [ $# -eq 0 ]
  then
    usage
    exit 0
fi
# Parse flags
while getopts r:p:b: flag
do
    case "${flag}" in
        r)
          region=${OPTARG}
          ;;
        p)
          prefix=${OPTARG}
          ;;
        b)
          billing_account_id=${OPTARG}
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
      echo "-----------------------------"
      usage
      exit 1
fi

if [ -z "$prefix" ]
then
      echo "Prefix is a required variable"
      echo "-----------------------------"
      usage
      exit 1
fi

if [ -z "$billing_account_id" ]
then
      echo "Billing account id is a required variable"
      echo "-----------------------------------------"
      usage
      exit 1
fi

selfDir=$(cd "$(dirname "$0")"; pwd)
envs=(staging production)
for env in "${envs[@]}";
do
  echo "About to create ${prefix}-fvst-${env} environment in region ${region}"
done

read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  #gcloud auth login
  gh variable set FVST_PROJECT_PREFIX --body "${prefix}"
  gh variable set FVST_PROJECT_REGION --body "${region}"
  gh secret set GH_TOKEN --app actions --body "$(gh auth token)"

  for env in "${envs[@]}";
  do
    project="${prefix}-fvst-${env}"
    env_uppercase=$(echo "$env" | tr a-z A-Z)
    echo "Creating project ${project} in region ${region}"

#    gcloud projects create "$project"
    echo "Linking billing account $billing_account_id to the project"
#    gcloud beta billing projects link "$project" --billing-account="$billing_account_id"

    gcloud config set project "$project"
    gcloud auth application-default login
#
#    ### Create service account for github actions
#    gcloud iam service-accounts create sa-gh-"$project" \
#      --description="Github Actions service account for $project Environment" \
#      --display-name="Github Actions Service Account"
#    gcloud projects add-iam-policy-binding "$project" \
#      --member="serviceAccount:sa-gh-$project@$project.iam.gserviceaccount.com" \
#      --role="roles/editor"
#
#    ### Create a key for service account and store it in github secrets
#    gcloud iam service-accounts keys create GH_ACTIONS_KEY.json --iam-account=sa-gh-"$project"@"$project".iam.gserviceaccount.com
#    gh secret set "GOOGLE_CLOUD_TOKEN_$env_uppercase" --app actions --body "$( jq -c . < GH_ACTIONS_KEY.json | base64)"
#    rm GH_ACTIONS_KEY.json

    ### Enable storage for remote terraform state
    gcloud services enable storage.googleapis.com
    bucket="gs://$prefix-$env-terraform-state-$(openssl rand -hex 12)"
    gcloud storage buckets create "$bucket"
    gh variable set "FVST_PROJECT_TF_STATE_BUCKET_$env_uppercase" --body "$bucket"

    ### Update terraform config for local development
    rm "$selfDir/../envs/$env/backend.tf"
    cat <<EOT >> "$selfDir/../envs/$env/backend.tf"
terraform {
  backend "gcs" {
    bucket = "$bucket"
  }
}
EOT

    rm "$selfDir/../envs/$env/terraform.tfvars"
    cat <<EOT >> "$selfDir/../envs/$env/terraform.tfvars"
region  = "$region"
project = "$project"
EOT

  done
fi

