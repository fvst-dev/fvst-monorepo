import { safeExec } from '../../utils/safeExec';
import { createIamArgument } from './arguments/createIamArgument';
import { Argument, Command } from '@commander-js/extra-typings';
import { githubRunnerRegionGroup, githubRunnerRegionList } from './constants/github-runner-regions';

export const createTerraformBucket = new Command()
  .command('create-terraform-bucket')
  .description('Creates a terraform bucket to store terraform state')
  .addArgument(createIamArgument())
  .addArgument(new Argument('<bucket>'))
  .action((iam, bucket) => {
    console.log(`Creating bucket ${bucket} for terraform state for project ${iam.project}`);
    safeExec(`gcloud services enable storage.googleapis.com --project ${iam.project}`);
    safeExec(
      `gcloud storage buckets create 'gs://${bucket}' --project ${
        iam.project
      } --location=${githubRunnerRegionGroup} --placement=${githubRunnerRegionList.join(',')}`
    );
    safeExec(`gh variable set 'FVST_PROJECT_TF_STATE_BUCKET_${iam.environment.toUpperCase()}' --body ${bucket}`);
  });
