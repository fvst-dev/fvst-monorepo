import { Argument } from '@commander-js/extra-typings';
import { environments } from '../constants/environments';

export const createEnvironmentArgument = () => {
  return new Argument('<environment>', 'What environment is this for').choices(environments);
};
