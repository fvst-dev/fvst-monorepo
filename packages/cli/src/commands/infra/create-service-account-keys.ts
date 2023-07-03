import { Command } from "@commander-js/extra-typings";
import { rm } from "shelljs";
import { readFileSync } from "node:fs";
import { safeExec } from "../../utils/safeExec";
import { createIamArgument } from "./arguments/createIamArgument";
import { createEnvironmentArgument } from "./arguments/createEnvironmentArgument";

export const createServiceAccountKeys = new Command()
  .command("create-service-account-keys")
  .description(
    "Creates a key for the service account and publishes it to GitHub secrets"
  )
  .addArgument(createIamArgument())
  .addArgument(createEnvironmentArgument())
  .action((iam, environment) => {
    const filename = "GH_ACTIONS_KEY.json";
    try {
      safeExec(
        `gcloud iam service-accounts keys create ${filename} --project=${iam.project} --iam-account=${iam.iam}`
      );
      const key = JSON.stringify(
        JSON.parse(readFileSync(filename).toString("utf-8"))
      );
      const keyAsBase64 = Buffer.from(key).toString("base64");
      safeExec(
        `gh secret set GOOGLE_CLOUD_TOKEN_${environment.toUpperCase()} --app actions --body ${keyAsBase64}`
      );
    } finally {
      rm(filename);
    }
  });
