import { Resolvers } from './generated/schema';
import getRandomNumber from '../resolvers/Query/getRandomNumber';

const resolvers: Resolvers = {
  Query: {
    getRandomNumber: () => getRandomNumber(),
  },
};

export default resolvers;
