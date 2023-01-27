import { allow, deny, shield } from "graphql-shield";

// TODO: add actual rules for allowing resolvers

const permissions = shield(
  {
    Query: {
      isValidToken: allow,
      me: allow,
      // allow for gateway
      _service: allow,
      _entities: allow,
    },
    User: allow,
    Mutation: {
      loginWithUsernameAndPassword: allow,
    },
    LoginResult: allow,
    // allow for gateway
    _Service: allow,
    _Entity: allow,
  },
  {
    fallbackRule: deny,
  }
);

export default permissions;
