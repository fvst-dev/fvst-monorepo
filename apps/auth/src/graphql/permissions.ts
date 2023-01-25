import { allow, deny, shield } from "graphql-shield";

const permissions = shield(
  {
    Query: {
      isValidToken: allow,
    },
    Mutation: {},
  },
  {
    fallbackRule: deny,
  }
);

export default permissions;
