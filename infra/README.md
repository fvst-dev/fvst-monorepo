Followed this tutorial: https://gcloud.devoteam.com/blog/a-step-by-step-guide-to-set-up-a-gcp-project-to-start-using-terraform/

Make sure the project_id variable is set to something unique and add the value to `./envs/staging/terraform.tfvars`

```shell
$PROJECT_ID=peeter-fvst-staging
gcloud auth login
gcloud projects create $PROJECT_ID
gcloud config set project $PROJECT_ID
gcloud auth application-default login
gcloud iam service-accounts create sa-tf-$PROJECT_ID \
  --description="Terraform Service account Staging Environment" \
  --display-name="Terraform Service Account"
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:sa-tf-$PROJECT_ID@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/editor"
```

```shell
gcloud iam service-accounts get-iam-policy sa-tf-$PROJECT_ID@$PROJECT_ID.iam.gserviceaccount.com \
  --format=json > policy.json
```
