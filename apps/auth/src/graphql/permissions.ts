import { allow, shield } from 'graphql-shield';

const permissions = shield(
  {},
  {
    fallbackRule: allow,
  }
);

export default permissions;
