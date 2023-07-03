import prompts from "prompts";
import { safeExec } from "../../utils/safeExec";
import { ensureDeps } from "./util/ensureDeps";
import { Command } from "@commander-js/extra-typings";
import { environments } from "./constants/environments";
import { regions } from "./constants/regions";

const getBillingAccounts = () => {
  try {
    const [stdout] = safeExec(
      "gcloud beta billing accounts list --format json"
    );
    return JSON.parse(stdout).map(({ displayName, name }: any) => ({
      title: displayName,
      value: name.split("/")[1],
    }));
  } catch (e) {
    throw new Error(
      "You have to setup a billing account - follow the tutorial at https://cloud.google.com/billing/docs/how-to/create-billing-account"
    );
  }
};

/**
 * gcloud auth login
 *   gh variable set FVST_PROJECT_PREFIX --body '${prefix}'
 *   gh variable set FVST_PROJECT_REGION --body '${region}'
 *   gh secret set GH_TOKEN --app actions --body '$(gh auth token)'
 *
 *   for env in '${envs[@]}';
 *   do
 *     project='${prefix}-fvst-${env}'
 *     env_uppercase=$(echo '$env' | tr a-z A-Z)
 *     echo 'Creating project ${project} in region ${region}'
 *
 *     gcloud projects create '$project'
 *     ### This is needed for terraform to work
 *     gcloud services enable cloudresourcemanager.googleapis.com
 *
 *     echo 'Linking billing account $billing_account_id to the project'
 *     gcloud beta billing projects link '$project' --billing-account='$billing_account_id'
 *
 *     gcloud config set project '$project'
 *     gcloud auth application-default login
 *
 *     ### Create service account for github actions
 *     gcloud iam service-accounts create sa-gh-'$project' \
 *       --description='Github Actions service account for $project Environment' \
 *       --display-name='Github Actions Service Account'
 *     gcloud projects add-iam-policy-binding '$project' \
 *       --member='serviceAccount:sa-gh-$project@$project.iam.gserviceaccount.com' \
 *       --role='roles/editor'
 *
 *     ### Create a key for service account and store it in github secrets
 *     gcloud iam service-accounts keys create GH_ACTIONS_KEY.json --iam-account=sa-gh-'$project'@'$project'.iam.gserviceaccount.com
 *     gh secret set 'GOOGLE_CLOUD_TOKEN_$env_uppercase' --app actions --body '$( jq -c . < GH_ACTIONS_KEY.json | base64)'
 *     rm GH_ACTIONS_KEY.json
 *
 *     ### Enable storage for remote terraform state
 *     bucket='$prefix-$env-terraform-state-$(openssl rand -hex 12)'
 *     gcloud services enable storage.googleapis.com
 *     gcloud storage buckets create 'gs://$bucket'
 *     gcloud storage buckets add-iam-policy-binding 'gs://$bucket' --member=serviceAccount:sa-gh-'$project'@'$project'.iam.gserviceaccount.com --role=roles/storage.objectAdmin
 *     gsutil versioning set on 'gs://$bucket'
 *     gh variable set 'FVST_PROJECT_TF_STATE_BUCKET_$env_uppercase' --body '$bucket'
 *
 *     ### Add permissions to iam
 *     gcloud projects add-iam-policy-binding '$project' \
 *       --member='serviceAccount:sa-gh-$project@$project.iam.gserviceaccount.com' \
 *       --role='roles/storage.objectAdmin'
 */

export const init = new Command()
  .command("init")
  .description("Sets up the entire infrastructure")
  .action(async () => {
    ensureDeps();
    const answers = await prompts(
      [
        {
          type: "autocomplete",
          name: "region",
          initial: "eu-west-1",
          message: "In what region should we create the environments in?",
          choices: regions.map((v) => ({
            title: v,
            value: v,
          })),
        },
        {
          type: "text",
          name: "prefix",
          message:
            "Please give a unique prefix for the projects we will setup in GCP",
          validate: (value: string) => {
            if (!value || value.length < 1) {
              return "Prefix can not be empty";
            }
            if (value.length > 15) {
              return "Prefix can not be longer than 15 characters";
            }
            if (value.charAt(0) === value.charAt(0).toUpperCase()) {
              return "Prefix can not start with an uppercase number";
            }
            if (value.match(/^\d/)) {
              return "Prefix can not start with a number";
            }
            return true;
          },
        },
        {
          type: "autocomplete",
          name: "billingAccountId",
          choices: getBillingAccounts(),
          message: "What billing account to use",
        },
      ],
      {
        onCancel: () => {
          process.exit(1);
        },
      }
    );

    const { region, prefix, billingAccountId } = answers;
    const [githubAuthToken] = safeExec("gh auth token");
    console.log("Setting up github variables and secrets");
    const commands = [
      `gh variable set FVST_PROJECT_PREFIX --body '${prefix}'`,
      `gh variable set FVST_PROJECT_REGION --body '${region}'`,
      `gh secret set GH_TOKEN --app actions --body '${githubAuthToken}'`,
    ];
    commands.map((command) => safeExec(command));
    console.log("Setting up environments", environments);

    environments.forEach((environment) => {
      const project = `${prefix}-fvst-${environment}`;
      const iam = `sa-gh-${project}@${project}.iam.gserviceaccount.com`;
      safeExec(
        `fvst infra setup-project ${project} ${billingAccountId}`,
        false
      );
      safeExec(
        `fvst infra create-service-account ${iam} ${environment}`,
        false
      );
      safeExec(
        `fvst infra create-service-account-keys ${iam} ${environment}`,
        false
      );
    });
  });
