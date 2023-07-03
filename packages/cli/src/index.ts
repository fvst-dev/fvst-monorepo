#! /usr/bin/env ts-node

import { Command } from "@commander-js/extra-typings";
import { init } from "./commands/infra/init";
import { setupProject } from "./commands/infra/setup-project";
import { createServiceAccountKeys } from "./commands/infra/create-service-account-keys";
import { createServiceAccount } from "./commands/infra/create-service-account";

const program = new Command();

const infra = program.command("infra");
[init, setupProject, createServiceAccount, createServiceAccountKeys].forEach(
  (c) => {
    infra.addCommand(c);
  }
);

program.parse();
