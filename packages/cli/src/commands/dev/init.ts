import { safeExec } from '../../utils/safeExec';
import { Command } from '@commander-js/extra-typings';
import { parse, stringify } from 'envfile';
import path from 'node:path';
import fs from 'node:fs';
import prompts from 'prompts';

const environmentToLoadFrom = 'staging';

const secretMap = {
  CLERK_ISSUER: 'clerk_issuer',
  CLERK_JWSK_URL: 'clerk_jwsk_url',
  CLERK_PUBLISHABLE_KEY: 'clerk_publishable_key',
  CLERK_SECRET_KEY: 'clerk_secret_key',
};

const apply = (exampleConfig, secretValues) => {
  const result = {
    ...exampleConfig,
  };
  Object.keys(secretValues).forEach(function (key) {
    if (key in exampleConfig) {
      result[key] = secretValues[key];
    }
  });
  return result;
};

export const init = new Command()
  .command('init')
  .description(`Sets up .env files with values from ${environmentToLoadFrom}`)
  .action(async () => {
    const filePath = path.resolve(__dirname, `../../../../../apps`);
    const apps = fs.readdirSync(filePath);
    const prefix = safeExec(`gh variable list | grep FVST_PROJECT_PREFIX | awk -F ' ' '{print $2}'`).join('').trim();
    const project = `${prefix}-fvst-${environmentToLoadFrom}`;
    console.log(`This script loads all configured secret values from ${environmentToLoadFrom} secret manager`);
    console.log('and merges them with the values from .env.example');
    console.log('and then overwrites the .env files with the final results');
    console.log(`Files that will be overwritten/created:`);
    apps.forEach((app) => {
      console.log(`* /apps/${app}/.env`);
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

    const secretValues = Object.keys(secretMap).reduce((orig, key) => {
      const secret = safeExec(`gcloud secrets versions access latest --secret ${secretMap[key]} --project ${project}`)
        .join('')
        .trim();
      orig[key] = secret;
      return orig;
    }, {});
    apps.forEach((app) => {
      const envExampleFile = path.resolve(filePath, `${app}/.env.example`);
      const envExample = parse(fs.readFileSync(envExampleFile, 'utf-8'));
      const env = apply(envExample, secretValues);
      fs.writeFileSync(path.resolve(filePath, `${app}/.env`), stringify(env));
    });
    console.log('Finished');
  });
