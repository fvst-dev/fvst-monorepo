import { safeExec } from '../../utils/safeExec';
import { createIamArgument } from './arguments/createIamArgument';
import { Command } from '@commander-js/extra-typings';
import { createRegionArgument } from './arguments/createRegionArgument';

export const createContainerRegistry = new Command()
  .command('create-container-registry')
  .description('Creates a container registry for Docker images')
  .addArgument(createIamArgument())
  .addArgument(createRegionArgument())
  .action((iam, region) => {
    console.log(`Creating artifact registry "registry" for docker images used in project ${iam.project}`);
    safeExec(`gcloud services enable compute.googleapis.com artifactregistry.googleapis.com --project ${iam.project}`);
    safeExec(
      `gcloud artifacts repositories create 'registry' --repository-format docker --description="Docker repository" --location ${region} --project ${iam.project}`
    );
  });
