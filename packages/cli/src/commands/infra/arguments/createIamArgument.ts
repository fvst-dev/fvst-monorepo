import { Argument, InvalidArgumentError } from '@commander-js/extra-typings';
import { environments } from '../constants/environments';

type Iam = {
  account: string;
  project: string;
  environment: (typeof environments)[number];
  iam: string;
};

export const createIamArgument = () => {
  return new Argument('<iam>', 'IAM in the format of <account>@<project>.iam.gserviceaccount.com').argParser(
    (iam): Iam => {
      try {
        const [account, host] = iam.split('@');
        const [project] = host.split('.');
        const environment = project.split('-fvst-')[1] as (typeof environments)[number];
        if (!account || !project) {
          throw new InvalidArgumentError('Not a valid IAM.');
        }
        if (!environments.includes(environment)) {
          throw new InvalidArgumentError('Not a valid IAM.');
        }
        return { account, project, iam, environment };
      } catch (e) {
        throw new InvalidArgumentError('Not a valid IAM.');
      }
    }
  );
};
