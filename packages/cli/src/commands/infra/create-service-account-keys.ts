import { Command } from '@commander-js/extra-typings';
import { rm } from 'shelljs';
import { readFileSync } from 'node:fs';
import { safeExec } from '../../utils/safeExec';
import { createIamArgument } from './arguments/createIamArgument';

export const createServiceAccountKeys = new Command()
  .command('create-service-account-keys')
  .description('Creates a key for the service account and publishes it to GitHub secrets')
  .addArgument(createIamArgument())
  .action((iam) => {
    const filename = 'GH_ACTIONS_KEY.json';
    console.log(`Creating service account keys for ${iam.iam} on project ${iam.project}`);

    try {
      safeExec(`gcloud iam service-accounts keys create ${filename} --project=${iam.project} --iam-account=${iam.iam}`);
      const key = JSON.stringify(JSON.parse(readFileSync(filename).toString('utf-8')));
      const keyAsBase64 = Buffer.from(key).toString('base64');
      safeExec(`gh secret set GOOGLE_CLOUD_TOKEN_${iam.environment.toUpperCase()} --app actions --body ${keyAsBase64}`);
    } finally {
      rm(filename);
    }
  });
