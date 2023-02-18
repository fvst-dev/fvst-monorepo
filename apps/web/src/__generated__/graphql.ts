/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountNumber: any;
  BigInt: any;
  Byte: any;
  CountryCode: any;
  Cuid: any;
  Currency: any;
  DID: any;
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  Duration: any;
  EmailAddress: any;
  GUID: any;
  HSL: any;
  HSLA: any;
  HexColorCode: any;
  Hexadecimal: any;
  IBAN: any;
  IP: any;
  IPv4: any;
  IPv6: any;
  ISBN: any;
  ISO8601Duration: any;
  JSON: any;
  JSONObject: any;
  JWT: any;
  Latitude: any;
  LocalDate: any;
  LocalEndTime: any;
  LocalTime: any;
  Locale: any;
  Long: any;
  Longitude: any;
  MAC: any;
  NegativeFloat: any;
  NegativeInt: any;
  NonEmptyString: any;
  NonNegativeFloat: any;
  NonNegativeInt: any;
  NonPositiveFloat: any;
  NonPositiveInt: any;
  ObjectID: any;
  PhoneNumber: any;
  Port: any;
  PositiveFloat: any;
  PositiveInt: any;
  PostalCode: any;
  RGB: any;
  RGBA: any;
  RoutingNumber: any;
  SafeInt: any;
  SemVer: any;
  Time: any;
  TimeZone: any;
  Timestamp: any;
  URL: any;
  USCurrency: any;
  UUID: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  UtcOffset: any;
  Void: any;
  _Any: any;
  federation__FieldSet: any;
  link__Import: any;
};

export type Account = {
  __typename?: 'Account';
  access_token?: Maybe<Scalars['String']>;
  expires_at?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  id_token?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: Maybe<Scalars['String']>;
  refresh_token_expires_in?: Maybe<Scalars['Int']>;
  scope?: Maybe<Scalars['String']>;
  session_state?: Maybe<Scalars['String']>;
  token_type?: Maybe<Scalars['String']>;
  type: ProviderType;
  userId: Scalars['ID'];
};

export type AccountLink = {
  access_token?: InputMaybe<Scalars['String']>;
  expires_at?: InputMaybe<Scalars['Int']>;
  id_token?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
  refresh_token?: InputMaybe<Scalars['String']>;
  refresh_token_expires_in?: InputMaybe<Scalars['Int']>;
  scope?: InputMaybe<Scalars['String']>;
  session_state?: InputMaybe<Scalars['String']>;
  token_type?: InputMaybe<Scalars['String']>;
  type: ProviderType;
  userId: Scalars['ID'];
};

export type AdapterSession = {
  __typename?: 'AdapterSession';
  expires: Scalars['DateTime'];
  sessionToken: Scalars['String'];
  userId: Scalars['String'];
};

export type AdapterUser = {
  __typename?: 'AdapterUser';
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateSession = {
  expires: Scalars['DateTime'];
  sessionToken: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateUser = {
  email: Scalars['String'];
  emailVerified?: InputMaybe<Scalars['DateTime']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateVerificationToken = {
  expires: Scalars['DateTime'];
  identifier: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession: AdapterSession;
  createUser: AdapterUser;
  createVerificationToken: VerificationToken;
  deleteSession?: Maybe<AdapterSession>;
  deleteUser?: Maybe<User>;
  linkAccount?: Maybe<Account>;
  unlinkAccount?: Maybe<Account>;
  updateSession?: Maybe<AdapterSession>;
  updateUser: User;
};

export type MutationCreateSessionArgs = {
  data: CreateSession;
};

export type MutationCreateUserArgs = {
  user: CreateUser;
};

export type MutationCreateVerificationTokenArgs = {
  verificationToken: CreateVerificationToken;
};

export type MutationDeleteSessionArgs = {
  sessionToken: Scalars['String'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationLinkAccountArgs = {
  data: AccountLink;
};

export type MutationUnlinkAccountArgs = {
  providerInfo: ProviderAccountInfo;
};

export type MutationUpdateSessionArgs = {
  data: UpdateSession;
};

export type MutationUpdateUserArgs = {
  user: UpdateUser;
};

export type ProviderAccountInfo = {
  provider: Scalars['String'];
  providerAccountId: Scalars['String'];
};

export enum ProviderType {
  Credentials = 'credentials',
  Email = 'email',
  Oauth = 'oauth',
}

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  getSessionAndUser?: Maybe<SessionWithUser>;
  getUser?: Maybe<User>;
  getUserByAccount?: Maybe<User>;
  getUserByEmail?: Maybe<User>;
  me?: Maybe<User>;
};

export type QueryGetSessionAndUserArgs = {
  sessionToken: Scalars['String'];
};

export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type QueryGetUserByAccountArgs = {
  providerInfo: ProviderAccountInfo;
};

export type QueryGetUserByEmailArgs = {
  email: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  expires: Scalars['DateTime'];
  id: Scalars['ID'];
  sessionToken: Scalars['String'];
  userId: Scalars['String'];
};

export type SessionWithUser = {
  __typename?: 'SessionWithUser';
  session?: Maybe<Session>;
  user?: Maybe<User>;
};

export type UpdateSession = {
  expires?: InputMaybe<Scalars['DateTime']>;
  sessionToken: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateUser = {
  email?: InputMaybe<Scalars['String']>;
  emailVerified?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type VerificationToken = {
  __typename?: 'VerificationToken';
  expires: Scalars['DateTime'];
  identifier: Scalars['String'];
  token: Scalars['String'];
};

export type _Service = {
  __typename?: '_Service';
  sdl?: Maybe<Scalars['String']>;
};

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY',
}

export type CreateUserMutationVariables = Exact<{
  user: CreateUser;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'AdapterUser';
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
  };
};

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  getUser?: { __typename?: 'User'; id: string; name?: string | null; email?: string | null } | null;
};

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;

export type GetUserByEmailQuery = {
  __typename?: 'Query';
  getUserByEmail?: { __typename?: 'User'; id: string; name?: string | null; image?: string | null } | null;
};

export type GetUserByAccountQueryVariables = Exact<{
  providerInfo: ProviderAccountInfo;
}>;

export type GetUserByAccountQuery = {
  __typename?: 'Query';
  getUserByAccount?: { __typename?: 'User'; id: string; name?: string | null; email?: string | null } | null;
};

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUser;
}>;

export type UpdateUserMutation = {
  __typename?: 'Mutation';
  updateUser: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
  };
};

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String'];
}>;

export type DeleteUserMutation = {
  __typename?: 'Mutation';
  deleteUser?: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    image?: string | null;
    emailVerified?: Date | null;
    email?: string | null;
  } | null;
};

export type LinkAccountMutationVariables = Exact<{
  data: AccountLink;
}>;

export type LinkAccountMutation = {
  __typename?: 'Mutation';
  linkAccount?: {
    __typename?: 'Account';
    id: string;
    userId: string;
    type: ProviderType;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    refresh_token_expires_in?: number | null;
  } | null;
};

export type UnlinkAccountMutationVariables = Exact<{
  providerInfo: ProviderAccountInfo;
}>;

export type UnlinkAccountMutation = {
  __typename?: 'Mutation';
  unlinkAccount?: {
    __typename?: 'Account';
    userId: string;
    type: ProviderType;
    token_type?: string | null;
    session_state?: string | null;
    scope?: string | null;
    refresh_token_expires_in?: number | null;
  } | null;
};

export type GetSessionAndUserQueryVariables = Exact<{
  sessionToken: Scalars['String'];
}>;

export type GetSessionAndUserQuery = {
  __typename?: 'Query';
  getSessionAndUser?: {
    __typename?: 'SessionWithUser';
    user?: {
      __typename?: 'User';
      id: string;
      name?: string | null;
      email?: string | null;
      emailVerified?: Date | null;
      image?: string | null;
    } | null;
    session?: { __typename?: 'Session'; id: string; sessionToken: string; userId: string; expires: Date } | null;
  } | null;
};

export type CreateSessionMutationVariables = Exact<{
  data: CreateSession;
}>;

export type CreateSessionMutation = {
  __typename?: 'Mutation';
  createSession: { __typename?: 'AdapterSession'; userId: string; sessionToken: string; expires: Date };
};

export type UpdateSessionMutationVariables = Exact<{
  data: UpdateSession;
}>;

export type UpdateSessionMutation = {
  __typename?: 'Mutation';
  updateSession?: { __typename?: 'AdapterSession'; userId: string; sessionToken: string; expires: Date } | null;
};

export type DeleteSessionMutationVariables = Exact<{
  sessionToken: Scalars['String'];
}>;

export type DeleteSessionMutation = {
  __typename?: 'Mutation';
  deleteSession?: { __typename?: 'AdapterSession'; userId: string; sessionToken: string; expires: Date } | null;
};

export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'user' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateUser' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'user' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'user' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'getUserId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'getUserId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserByEmailDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserByEmail' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUserByEmail' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'email' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const GetUserByAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserByAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'providerInfo' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ProviderAccountInfo' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getUserByAccount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'providerInfo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'providerInfo' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByAccountQuery, GetUserByAccountQueryVariables>;
export const UpdateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'user' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateUser' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'user' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'user' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'deleteUserId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'deleteUserId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const LinkAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'LinkAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AccountLink' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'linkAccount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'provider' } },
                { kind: 'Field', name: { kind: 'Name', value: 'providerAccountId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refresh_token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'access_token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expires_at' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scope' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id_token' } },
                { kind: 'Field', name: { kind: 'Name', value: 'session_state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refresh_token_expires_in' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LinkAccountMutation, LinkAccountMutationVariables>;
export const UnlinkAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UnlinkAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'providerInfo' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ProviderAccountInfo' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'unlinkAccount' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'providerInfo' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'providerInfo' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'token_type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'session_state' } },
                { kind: 'Field', name: { kind: 'Name', value: 'scope' } },
                { kind: 'Field', name: { kind: 'Name', value: 'refresh_token_expires_in' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UnlinkAccountMutation, UnlinkAccountMutationVariables>;
export const GetSessionAndUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSessionAndUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getSessionAndUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sessionToken' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'emailVerified' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'session' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSessionAndUserQuery, GetSessionAndUserQueryVariables>;
export const CreateSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'CreateSession' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createSession' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateSessionMutation, CreateSessionMutationVariables>;
export const UpdateSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'UpdateSession' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateSession' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateSessionMutation, UpdateSessionMutationVariables>;
export const DeleteSessionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteSession' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteSession' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sessionToken' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'sessionToken' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sessionToken' } },
                { kind: 'Field', name: { kind: 'Name', value: 'expires' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteSessionMutation, DeleteSessionMutationVariables>;
