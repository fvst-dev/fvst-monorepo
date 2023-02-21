import { Resolvers } from './generated/schema';

const resolvers: Resolvers = {
  Query: {
    getPaymentLink: () => 'Nope',
  },
};

export default resolvers;
