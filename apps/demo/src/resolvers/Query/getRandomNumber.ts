import { Query2 } from '../../graphql/generated/schema';

export default async (): Promise<Query2['getRandomNumber']> => {
  return Math.floor(Math.random() * 999_999_999);
};
