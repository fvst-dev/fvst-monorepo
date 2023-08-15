import { safeExec } from '../../utils/safeExec';
import { createIamArgument } from './arguments/createIamArgument';
import { Command } from '@commander-js/extra-typings';

export const createServiceAccount = new Command()
  .command('create-service-account')
  .description('Creates a service account with the appropriate permissions')
  .addArgument(createIamArgument())
  .action((iam) => {
    const roles = [
      // Required for terraform to manage resource on GCP
      'roles/editor',
      // Required for terraform remote state bucket access as well as turborepo
      'roles/storage.objectAdmin',
      // Required for terraform to manage secrets
      'roles/secretmanager.admin',
      // Can create, update, and delete services and jobs, can get, list, delete job executions.
      // Can get and set IAM policies.
      // Can view, apply and dismiss recommendations.
      'roles/run.admin',
      // Giving permissiosn to create a token so that we can login to the artifact registry on github actions when using docker buildx (caching)
      'roles/iam.serviceAccountTokenCreator',
      // Gives access to manage IAM policies
      'roles/resourcemanager.projectIamAdmin',
    ];
    console.log(`Creating service account ${iam.account} with roles ${roles} for ${iam.project}`);
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
