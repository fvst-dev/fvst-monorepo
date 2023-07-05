import { Argument, InvalidArgumentError } from '@commander-js/extra-typings';
import { regions } from '../constants/regions';

export const createRegionArgument = () => {
  return new Argument('<region>', 'Region').argParser((region): string => {
    try {
      if (!regions.includes(region)) {
        throw new Error('Unknown region');
      }
      return region;
    } catch (e) {
      throw new InvalidArgumentError('Not a valid region.');
    }
  });
};
