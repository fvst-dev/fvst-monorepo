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
    /**
     *     gcloud services enable compute.googleapis.com artifactregistry.googleapis.com
     *     gcloud artifacts repositories create '$project'
     */
    const bucket = `${iam.project}-terraform-state-${Math.random().toString(36).substring(2, 10)}`;
    console.log(`Creating artifact registry "registry" for apps Docker images used in project ${iam.project}`);

    safeExec(`gcloud services enable compute.googleapis.com artifactregistry.googleapis.com --project ${iam.project}`);
    safeExec(
      `gcloud artifacts repositories create 'registry' --repository-format docker --description="Docker repository" --location ${region} --project ${iam.project}`
    );
  });
