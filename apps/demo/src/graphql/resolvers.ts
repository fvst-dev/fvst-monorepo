import { Resolvers } from "./generated/schema";
import getRandomNumber from "../resolvers/Query/getRandomNumber";

const resolvers: Resolvers = {
  Query: {
    getRandomNumber: () => getRandomNumber(),
    getUserById: (_, args) => ({
      id: args.id,
      randomNumber: Math.floor(Math.random() * 999_999_999),
    }),
  },
  User: {
    __resolveReference: (ref) => ({
      id: ref.id,
      randomNumber: Math.floor(Math.random() * 999_999_999),
    }),
  },
};

export default resolvers;
