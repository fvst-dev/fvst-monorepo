import { safeExec } from "../../utils/safeExec";
import { createIamArgument } from "./arguments/createIamArgument";
import { Command } from "@commander-js/extra-typings";
import { createEnvironmentArgument } from "./arguments/createEnvironmentArgument";

export const createServiceAccount = new Command()
  .command("create-service-account")
  .description("Creates a service account with the appropriate permissions")
  .addArgument(createIamArgument())
  .addArgument(createEnvironmentArgument())
  .action((iam, environment) => {
    const roles = [
      // Required for terraform to manage resource on GCP
      "roles/editor",
      // Required for terraform remote state bucket access
      "roles/storage.objectAdmin",
    ];
    console.log(
      `Creating service account ${iam.account} with roles ${roles} for ${iam.project}`
    );
    const commands = [
      `gcloud iam service-accounts create ${iam.account} --project=${iam.project} --description="Github Actions service account for ${iam.project}"  --display-name="Github Actions service account for ${iam.project}"`,
      // Required for terraform to manage resource on GCP
      ...roles.map(
        (role) =>
          `gcloud projects add-iam-policy-binding ${iam.project} --member="serviceAccount:${iam.iam}" --role="${role}"`
      ),
    ];
    commands.map((c) => safeExec(c));
  });
