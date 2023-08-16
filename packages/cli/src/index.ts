#! /usr/bin/env ts-node

import { Command } from '@commander-js/extra-typings';

import { init as devInit } from './commands/dev/init';

import { init } from './commands/infra/init';
import { setupProject } from './commands/infra/setup-project';
import { createServiceAccountKeys } from './commands/infra/create-service-account-keys';
import { createServiceAccount } from './commands/infra/create-service-account';
import { createTerraformBucket } from './commands/infra/create-terraform-bucket';
import { createContainerRegistry } from './commands/infra/create-container-registry';
import { createTurborepoBucket } from './commands/infra/create-turborepo-bucket';
import { configureTerraformBucketLocally } from './commands/infra/configure-terraform-bucket-locally';
import { configureTerraformVarsLocally } from './commands/infra/configure-terraform-vars-locally';
import { setupSecrets } from './commands/infra/setup-secrets';

const program = new Command();

const infra = program.command('infra');
[
  init,
  setupProject,
  createServiceAccount,
  createServiceAccountKeys,
  createTerraformBucket,
  createTurborepoBucket,
  createContainerRegistry,
  configureTerraformBucketLocally,
  configureTerraformVarsLocally,
  setupSecrets,
].forEach((c) => {
  infra.addCommand(c);
});

const dev = program.command('dev');
[devInit].forEach((c) => {
  dev.addCommand(c);
});

program.parse();
