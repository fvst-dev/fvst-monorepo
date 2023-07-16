import { safeExec } from '../../utils/safeExec';
import { createIamArgument } from './arguments/createIamArgument';
import { Command } from '@commander-js/extra-typings';
import { githubRunnerRegionGroup } from './constants/github-runner-regions';

export const createContainerRegistry = new Command()
  .command('create-container-registry')
  .description('Creates a container registry for Docker images')
  .addArgument(createIamArgument())
  .action((iam) => {
    console.log(`Creating artifact registry "registry" for docker images used in project ${iam.project}`);
    // this is needed for CI to be able to generate tokens for docker to access artifact repository
    safeExec(`gcloud services enable iamcredentials.googleapis.com --project=${iam.project}`);
    safeExec(`gcloud services enable compute.googleapis.com artifactregistry.googleapis.com --project ${iam.project}`);
    safeExec(
      `gcloud artifacts repositories create 'registry' --repository-format docker --description="Docker repository" --location ${githubRunnerRegionGroup} --project ${iam.project}`
    );
  });
