import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';
import { gql, NormalizedCacheObject } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import {
  CreateSessionMutation,
  CreateSessionMutationVariables,
  CreateUserMutation,
  CreateUserMutationVariables,
  GetSessionAndUserQuery,
  GetSessionAndUserQueryVariables,
  GetUserByAccountQuery,
  GetUserByAccountQueryVariables,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '../__generated__/graphql';

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUser!) {
    createUser(user: $user) {
      id
      email
      name
      image
      emailVerified
    }
  }
`;

const GET_USER = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      name
      email
    }
  }
`;

const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      image
    }
  }
`;

const GET_USER_BY_ACCOUNT = gql`
  query GetUserByAccount($providerInfo: ProviderAccountInfo!) {
    getUserByAccount(providerInfo: $providerInfo) {
      id
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUser!) {
    updateUser(user: $user) {
      id
      name
      email
      emailVerified
      image
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      id
      name
      image
      emailVerified
      email
    }
  }
`;

const LINK_ACCOUNT = gql`
  mutation LinkAccount($data: AccountLink!) {
    linkAccount(data: $data) {
      id
      userId
      type
      provider
      providerAccountId
      refresh_token
      access_token
      expires_at
      token_type
      scope
      id_token
      session_state
      refresh_token_expires_in
    }
  }
`;

const UNLINK_ACCOUNT = gql`
  mutation UnlinkAccount($providerInfo: ProviderAccountInfo!) {
    unlinkAccount(providerInfo: $providerInfo) {
      userId
      type
      token_type
      session_state
      scope
      refresh_token_expires_in
    }
  }
`;

const GET_SESSION_AND_USER = gql`
  query GetSessionAndUser($sessionToken: String!) {
    getSessionAndUser(sessionToken: $sessionToken) {
      user {
        id
        name
        email
        emailVerified
        image
      }
      session {
        id
        sessionToken
        userId
        expires
      }
    }
  }
`;

const CREATE_SESSION = gql`
  mutation CreateSession($data: CreateSession!) {
    createSession(data: $data) {
      userId
      sessionToken
      expires
    }
  }
`;

const UPDATE_SESSION = gql`
  mutation UpdateSession($data: UpdateSession!) {
    updateSession(data: $data) {
      userId
      sessionToken
      expires
    }
  }
`;

const DELETE_SESSION = gql`
  mutation DeleteSession($sessionToken: String!) {
    deleteSession(sessionToken: $sessionToken) {
      userId
      sessionToken
      expires
    }
  }
`;

export function GraphQlAdapter(client: ApolloClient<NormalizedCacheObject>, options: {}): Adapter {
  return {
    createUser: async (user) => {
      const userData = await client.mutate<CreateUserMutation, CreateUserMutationVariables>({
        mutation: CREATE_USER,
        variables: {
          user,
        },
      });
      return userData.data?.createUser as AdapterUser;
    },
    getUser: async (id) => {
      const userData = await client.query<GetUserQuery, GetUserQueryVariables>({
        query: GET_USER,
        variables: { getUserId: id },
      });
      return userData.data.getUser as AdapterUser;
    },
    getUserByEmail: async (email) => {
      const userData = await client.query<GetUserByEmailQuery, GetUserByEmailQueryVariables>({
        query: GET_USER_BY_EMAIL,
        variables: { email },
      });
      return userData.data.getUserByEmail as AdapterUser;
    },
    getUserByAccount: async (providerInfo) => {
      const userData = await client.query<GetUserByAccountQuery, GetUserByAccountQueryVariables>({
        query: GET_USER_BY_ACCOUNT,
        variables: {
          providerInfo,
        },
      });
      return userData.data.getUserByAccount as AdapterUser;
    },
    updateUser: async (data) => {
      const userData = await client.mutate<UpdateUserMutation, UpdateUserMutationVariables>({
        mutation: UPDATE_USER,
        variables: { user: { ...data } },
      });
      return userData.data?.updateUser as AdapterUser;
    },
    deleteUser: async (id) => {
      const userData = await client.mutate({
        mutation: DELETE_USER,
        variables: { id },
      });
      return userData.data.user;
    },
    linkAccount: async (data) => {
      const userData = await client.mutate({
        mutation: LINK_ACCOUNT,
        variables: { data },
      });
      return userData.data.linkAccount;
    },
    unlinkAccount: async (providerInfo) => {
      const userData = await client.mutate({
        mutation: UNLINK_ACCOUNT,
        variables: { providerInfo },
      });
      return userData.data.unlinkAccount;
    },
    getSessionAndUser: async (sessionToken) => {
      const userData = await client.query<GetSessionAndUserQuery, GetSessionAndUserQueryVariables>({
        query: GET_SESSION_AND_USER,
        variables: { sessionToken },
      });
      const dateParse = new Date(userData.data.getSessionAndUser?.session?.expires!);
      return {
        ...userData.data.getSessionAndUser,
        session: {
          expires: dateParse,
        },
      } as {
        session: AdapterSession;
        user: AdapterUser;
      };
    },
    createSession: async (data) => {
      const userData = await client.mutate({
        mutation: CREATE_SESSION,
        variables: {
          data,
        },
      });
      const dateParse = new Date(userData.data?.createSession.expires!);
      return {
        ...userData.data?.createSession,
        expires: dateParse,
      };
    },
    updateSession: async (data) => {
      const userData = await client.mutate({
        mutation: UPDATE_SESSION,
        variables: { data },
      });
      return userData.data.updateSession;
    },
    deleteSession: async (sessionToken) => {
      const userData = await client.mutate({
        mutation: DELETE_SESSION,
        variables: { sessionToken },
      });
      return userData.data.deleteSession;
    },
    // TODO add verification tokens back
    /*    async createVerificationToken(data) {
          const verificationToken = await p.verificationToken.create({ data });
          // @ts-expect-errors // MongoDB needs an ID, but we don't
          if (verificationToken.id) delete verificationToken.id;
          return verificationToken;
        },
        async useVerificationToken(identifier_token) {
          try {
            const verificationToken = await p.verificationToken.delete({
              where: { identifier_token }
            });
            // @ts-expect-errors // MongoDB needs an ID, but we don't
            if (verificationToken.id) delete verificationToken.id;
            return verificationToken;
          } catch (error) {
            // If token already used/deleted, just return null
            // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
            if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
              return null;
            throw error;
          }
        }*/
  };
}
