import { createIamArgument } from './arguments/createIamArgument';
import { Argument, Command } from '@commander-js/extra-typings';
import fs from 'node:fs';
import path from 'node:path';

export const configureTerraformVarsLocally = new Command()
  .command('configure-terraform-vars-locally')
  .description('Configures the local environment terraform vars')
  .addArgument(createIamArgument())
  .addArgument(new Argument('<region>'))
  .action((iam, region) => {
    const filePath = path.resolve(__dirname, `../../../../../infra/envs/${iam.environment}/terraform.tfvars`);
    fs.writeFileSync(
      filePath,
      `region  = "${region}"
project = "${iam.project}"
docker_tag = "latest"
    `
    );
  });
