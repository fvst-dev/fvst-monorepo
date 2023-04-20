import { Query } from '../../graphql/generated/schema';

export default async (): Promise<Query['getRandomNumber']> => {
  return Math.floor(Math.random() * 999_999_999);
};
