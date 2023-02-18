import { Resolvers } from './generated/schema';
import getRandomNumber from '../resolvers/Query/getRandomNumber';

const resolvers: Resolvers = {
  Query2: {
    getRandomNumber: () => getRandomNumber(),
  },
};

export default resolvers;
