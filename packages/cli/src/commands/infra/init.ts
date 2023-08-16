import prompts from 'prompts';
import { safeExec } from '../../utils/safeExec';
import { ensureDeps } from './util/ensureDeps';
import { Command } from '@commander-js/extra-typings';
import { environments } from './constants/environments';
import { regions } from './constants/regions';
import { projectName } from './util/projectName';

const getBillingAccounts = () => {
  try {
    const [stdout] = safeExec('gcloud beta billing accounts list --format json');
    return JSON.parse(stdout).map(({ displayName, name }: { displayName: string; name: string }) => ({
      title: displayName,
      value: name.split('/')[1],
    }));
  } catch (e) {
    throw new Error(
      'You have to setup a billing account - follow the tutorial at https://cloud.google.com/billing/docs/how-to/create-billing-account'
    );
  }
};

export const init = new Command()
  .command('init')
  .description('Sets up the entire infrastructure')
  .action(async () => {
    ensureDeps();
    const answers = await prompts(
      [
        {
          type: 'autocomplete',
          name: 'region',
          initial: 'europe-west1',
          message: 'In what region should we create the environments in?',
          choices: regions.map((v) => ({
            title: v,
            value: v,
          })),
        },
        {
          type: 'text',
          name: 'prefix',
          message: 'Please give a unique prefix for the projects we will setup in GCP',
          format: (val) => val.trim(),
          validate: (value: string) => {
            const prefix = value?.trim();
            if (!prefix || prefix.length < 1) {
              return 'Prefix can not be empty';
            }
            const [longestEnvName] = [...environments].sort();
            const longestProjectName = projectName(prefix, longestEnvName);
            const emptyProjectName = projectName('', longestEnvName);
            if (longestProjectName.length > 30) {
              return `Prefix can not be longer than ${30 - emptyProjectName.length} characters`;
            }
            if (prefix.charAt(0) === prefix.charAt(0).toUpperCase()) {
              return 'Prefix can not start with an uppercase number';
            }
            if (prefix.match(/^\d/)) {
              return 'Prefix can not start with a number';
            }
            return true;
          },
        },
        {
          type: 'autocomplete',
          name: 'billingAccountId',
          choices: getBillingAccounts(),
          message: 'What billing account to use',
        },
      ],
      {
        onCancel: () => {
          process.exit(1);
        },
      }
    );

    const { region, prefix, billingAccountId } = answers;
    console.log(
      `We will now setup the following environments in region ${region} tied to the billing account ${billingAccountId}: `
    );
    environments.forEach((environment) => {
      const project = projectName(prefix, environment);
      const iam = `github-actions@${project}.iam.gserviceaccount.com`;
      console.log(`* Environment = ${environment}, project = ${project}, iam = ${iam}`);
    });
    const { confirm } = await prompts(
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Continue?',
        initial: false,
      },
      {
        onCancel: () => process.exit(1),
      }
    );
    if (!confirm) {
      process.exit(1);
    }

    console.log('Setting up environments', environments);

    environments.forEach((environment) => {
      const project = projectName(prefix, environment);
      const iam = `github-actions@${project}.iam.gserviceaccount.com`;
      const bucket = `${project}-terraform-state-${Math.random().toString(36).substring(2, 10)}`;

      safeExec(`fvst infra setup-project ${project} ${billingAccountId}`, false);
      try {
        safeExec(`fvst infra create-service-account ${iam}`, false);
        safeExec(`fvst infra create-service-account-keys ${iam}`, false);
        safeExec(`fvst infra create-terraform-bucket ${iam} ${bucket}`, false);
        safeExec(`fvst infra create-turborepo-bucket ${iam}`, false);
        safeExec(`fvst infra create-container-registry ${iam}`, false);
        /**
         * Setup terraform locally
         */
        safeExec(`fvst infra configure-terraform-vars-locally ${iam} ${region}`, false);
        safeExec(`fvst infra configure-terraform-bucket-locally ${iam} ${bucket}`, false);
      } catch (e) {
        console.error('Failed configuring project access, deleting created project');
        safeExec(`gcloud projects delete ${project} --quiet`, false);
        throw e;
      }
    });
    const [githubAuthToken] = safeExec('gh auth token');
    console.log('Setting up github variables and secrets');
    const commands = [
      `gh variable set FVST_PROJECT_PREFIX --body '${prefix}'`,
      `gh variable set FVST_PROJECT_REGION --body '${region}'`,
      `gh secret set GH_TOKEN --app actions --body '${githubAuthToken}'`,
    ];
    commands.map((command) => safeExec(command));
    console.log('Projects created, running workflow to setup environments in google cloud');
    safeExec('gh workflow run initialize.yml --ref main');
    safeExec('gh workflow view initialize.yml --web');
  });
