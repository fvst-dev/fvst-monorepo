import { safeExec } from "../../utils/safeExec";
import { createIamArgument } from "./arguments/createIamArgument";
import { Command } from "@commander-js/extra-typings";

export const createTerraformBucket = new Command()
  .command("create-terraform-bucket")
  .description("Creates a terraform bucket to store terraform state")
  .addArgument(createIamArgument())
  .action((iam) => {
    /**
     *     bucket='$prefix-$env-terraform-state-$(openssl rand -hex 12)'
     *     gcloud services enable storage.googleapis.com
     *     gcloud storage buckets create 'gs://$bucket'
     *     gcloud storage buckets add-iam-policy-binding 'gs://$bucket' --member=serviceAccount:sa-gh-'$project'@'$project'.iam.gserviceaccount.com --role=roles/storage.objectAdmin
     *     gsutil versioning set on 'gs://$bucket'
     *     gh variable set 'FVST_PROJECT_TF_STATE_BUCKET_$env_uppercase' --body '$bucket'
     */
    const bucket = `${iam.project}-terraform-state-${Math.random()
      .toString(36)
      .substring(2, 10)}`;
    console.log(
      `Creating bucket ${bucket} for terraform state for project ${iam.project}`
    );
    safeExec(
      `gcloud services enable storage.googleapis.com --project ${iam.project}`
    );
    safeExec(
      `gcloud storage buckets create 'gs://${bucket}' --project ${iam.project}`
    );
    safeExec(
      `gh variable set 'FVST_PROJECT_TF_STATE_BUCKET_${iam.environment.toUpperCase()}' --body ${bucket}`
    );
  });
