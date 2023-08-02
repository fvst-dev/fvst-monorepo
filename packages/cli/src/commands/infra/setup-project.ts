import { safeExec } from '../../utils/safeExec';
import { Command } from '@commander-js/extra-typings';

export const setupProject = new Command()
  .command('setup-project')
  .description('Sets up the project in GCP')
  .argument('<project>', 'Project name')
  .argument('<billing-account-id>', 'What billing account to use (gcloud beta billing accounts list)')
  .action((project, billingAccountId) => {
    console.log('Creating project', project);
    safeExec(`gcloud projects create ${project}`);
    try {
      console.log('Configuring project');
      const commands = [
        // This is needed for terraform to work
        `gcloud services enable cloudresourcemanager.googleapis.com --project=${project}`,
        `gcloud services enable sqladmin.googleapis.com --project=${project}`,
        // Linking billing account to the project
        `gcloud beta billing projects link ${project} --billing-account=${billingAccountId}`,
      ];
      commands.map((c) => safeExec(c));
    } catch (e) {
      console.error('Failed configuring project, deleting created project');
      safeExec(`gcloud projects delete ${project} --quiet`, false);
      throw e;
    }
  });