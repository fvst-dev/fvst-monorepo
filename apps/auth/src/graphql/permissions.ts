import { allow, deny, shield } from 'graphql-shield';

// TODO: add actual rules for allowing resolvers

const permissions = shield(
  {
    Query: {
      me: allow,
      // allow for gateway
    },
    User: allow,
    Mutation: {
      createUser: allow,
    },
    // allow for gateway
  },
  {
    fallbackRule: allow,
  }
);

export default permissions;
