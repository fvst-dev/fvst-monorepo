/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  '\n  mutation CreateUser($user: CreateUser!) {\n    createUser(user: $user) {\n      id\n      email\n      name\n      image\n      emailVerified\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query GetUser($getUserId: String!) {\n    getUser(id: $getUserId) {\n      id\n      name\n      email\n    }\n  }\n':
    types.GetUserDocument,
  '\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      id\n      name\n      image\n    }\n  }\n':
    types.GetUserByEmailDocument,
  '\n  query GetUserByAccount($providerInfo: ProviderAccountInfo!) {\n    getUserByAccount(providerInfo: $providerInfo) {\n      id\n      name\n      email\n    }\n  }\n':
    types.GetUserByAccountDocument,
  '\n  mutation UpdateUser($user: UpdateUser!) {\n    updateUser(user: $user) {\n      id\n      name\n      email\n      emailVerified\n      image\n    }\n  }\n':
    types.UpdateUserDocument,
  '\n  mutation DeleteUser($deleteUserId: String!) {\n    deleteUser(id: $deleteUserId) {\n      id\n      name\n      image\n      emailVerified\n      email\n    }\n  }\n':
    types.DeleteUserDocument,
  '\n  mutation LinkAccount($data: AccountLink!) {\n    linkAccount(data: $data) {\n      id\n      userId\n      type\n      provider\n      providerAccountId\n      refresh_token\n      access_token\n      expires_at\n      token_type\n      scope\n      id_token\n      session_state\n      refresh_token_expires_in\n    }\n  }\n':
    types.LinkAccountDocument,
  '\n  mutation UnlinkAccount($providerInfo: ProviderAccountInfo!) {\n    unlinkAccount(providerInfo: $providerInfo) {\n      userId\n      type\n      token_type\n      session_state\n      scope\n      refresh_token_expires_in\n    }\n  }\n':
    types.UnlinkAccountDocument,
  '\n  query GetSessionAndUser($sessionToken: String!) {\n    getSessionAndUser(sessionToken: $sessionToken) {\n      user {\n        id\n        name\n        email\n        emailVerified\n        image\n      }\n      session {\n        id\n        sessionToken\n        userId\n        expires\n      }\n    }\n  }\n':
    types.GetSessionAndUserDocument,
  '\n  mutation CreateSession($data: CreateSession!) {\n    createSession(data: $data) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n':
    types.CreateSessionDocument,
  '\n  mutation UpdateSession($data: UpdateSession!) {\n    updateSession(data: $data) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n':
    types.UpdateSessionDocument,
  '\n  mutation DeleteSession($sessionToken: String!) {\n    deleteSession(sessionToken: $sessionToken) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n':
    types.DeleteSessionDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateUser($user: CreateUser!) {\n    createUser(user: $user) {\n      id\n      email\n      name\n      image\n      emailVerified\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateUser($user: CreateUser!) {\n    createUser(user: $user) {\n      id\n      email\n      name\n      image\n      emailVerified\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUser($getUserId: String!) {\n    getUser(id: $getUserId) {\n      id\n      name\n      email\n    }\n  }\n'
): (typeof documents)['\n  query GetUser($getUserId: String!) {\n    getUser(id: $getUserId) {\n      id\n      name\n      email\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      id\n      name\n      image\n    }\n  }\n'
): (typeof documents)['\n  query GetUserByEmail($email: String!) {\n    getUserByEmail(email: $email) {\n      id\n      name\n      image\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUserByAccount($providerInfo: ProviderAccountInfo!) {\n    getUserByAccount(providerInfo: $providerInfo) {\n      id\n      name\n      email\n    }\n  }\n'
): (typeof documents)['\n  query GetUserByAccount($providerInfo: ProviderAccountInfo!) {\n    getUserByAccount(providerInfo: $providerInfo) {\n      id\n      name\n      email\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateUser($user: UpdateUser!) {\n    updateUser(user: $user) {\n      id\n      name\n      email\n      emailVerified\n      image\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateUser($user: UpdateUser!) {\n    updateUser(user: $user) {\n      id\n      name\n      email\n      emailVerified\n      image\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteUser($deleteUserId: String!) {\n    deleteUser(id: $deleteUserId) {\n      id\n      name\n      image\n      emailVerified\n      email\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteUser($deleteUserId: String!) {\n    deleteUser(id: $deleteUserId) {\n      id\n      name\n      image\n      emailVerified\n      email\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation LinkAccount($data: AccountLink!) {\n    linkAccount(data: $data) {\n      id\n      userId\n      type\n      provider\n      providerAccountId\n      refresh_token\n      access_token\n      expires_at\n      token_type\n      scope\n      id_token\n      session_state\n      refresh_token_expires_in\n    }\n  }\n'
): (typeof documents)['\n  mutation LinkAccount($data: AccountLink!) {\n    linkAccount(data: $data) {\n      id\n      userId\n      type\n      provider\n      providerAccountId\n      refresh_token\n      access_token\n      expires_at\n      token_type\n      scope\n      id_token\n      session_state\n      refresh_token_expires_in\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UnlinkAccount($providerInfo: ProviderAccountInfo!) {\n    unlinkAccount(providerInfo: $providerInfo) {\n      userId\n      type\n      token_type\n      session_state\n      scope\n      refresh_token_expires_in\n    }\n  }\n'
): (typeof documents)['\n  mutation UnlinkAccount($providerInfo: ProviderAccountInfo!) {\n    unlinkAccount(providerInfo: $providerInfo) {\n      userId\n      type\n      token_type\n      session_state\n      scope\n      refresh_token_expires_in\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetSessionAndUser($sessionToken: String!) {\n    getSessionAndUser(sessionToken: $sessionToken) {\n      user {\n        id\n        name\n        email\n        emailVerified\n        image\n      }\n      session {\n        id\n        sessionToken\n        userId\n        expires\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetSessionAndUser($sessionToken: String!) {\n    getSessionAndUser(sessionToken: $sessionToken) {\n      user {\n        id\n        name\n        email\n        emailVerified\n        image\n      }\n      session {\n        id\n        sessionToken\n        userId\n        expires\n      }\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation CreateSession($data: CreateSession!) {\n    createSession(data: $data) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n'
): (typeof documents)['\n  mutation CreateSession($data: CreateSession!) {\n    createSession(data: $data) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UpdateSession($data: UpdateSession!) {\n    updateSession(data: $data) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdateSession($data: UpdateSession!) {\n    updateSession(data: $data) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n'];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation DeleteSession($sessionToken: String!) {\n    deleteSession(sessionToken: $sessionToken) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n'
): (typeof documents)['\n  mutation DeleteSession($sessionToken: String!) {\n    deleteSession(sessionToken: $sessionToken) {\n      userId\n      sessionToken\n      expires\n    }\n  }\n'];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never;
