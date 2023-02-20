import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  _FieldSet: any;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  AccountLink: AccountLink;
  AdapterSession: ResolverTypeWrapper<AdapterSession>;
  AdapterUser: ResolverTypeWrapper<AdapterUser>;
  CreateSession: CreateSession;
  CreateUser: CreateUser;
  CreateVerificationToken: CreateVerificationToken;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Mutation: ResolverTypeWrapper<{}>;
  ProviderAccountInfo: ProviderAccountInfo;
  ProviderType: ProviderType;
  Query: ResolverTypeWrapper<{}>;
  Session: ResolverTypeWrapper<Session>;
  SessionWithUser: ResolverTypeWrapper<SessionWithUser>;
  UpdateSession: UpdateSession;
  UpdateUser: UpdateUser;
  User: ResolverTypeWrapper<User>;
  VerificationToken: ResolverTypeWrapper<VerificationToken>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  String: Scalars['String'];
  Int: Scalars['Int'];
  ID: Scalars['ID'];
  AccountLink: AccountLink;
  AdapterSession: AdapterSession;
  AdapterUser: AdapterUser;
  CreateSession: CreateSession;
  CreateUser: CreateUser;
  CreateVerificationToken: CreateVerificationToken;
  DateTime: Scalars['DateTime'];
  Mutation: {};
  ProviderAccountInfo: ProviderAccountInfo;
  Query: {};
  Session: Session;
  SessionWithUser: SessionWithUser;
  UpdateSession: UpdateSession;
  UpdateUser: UpdateUser;
  User: User;
  VerificationToken: VerificationToken;
  Boolean: Scalars['Boolean'];
};

export type AccountResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = {
  access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expires_at?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  providerAccountId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refresh_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refresh_token_expires_in?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  session_state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProviderType'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdapterSessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AdapterSession'] = ResolversParentTypes['AdapterSession']
> = {
  expires?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  sessionToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdapterUserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['AdapterUser'] = ResolversParentTypes['AdapterUser']
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createSession?: Resolver<
    ResolversTypes['AdapterSession'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateSessionArgs, 'data'>
  >;
  createUser?: Resolver<
    ResolversTypes['AdapterUser'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'user'>
  >;
  createVerificationToken?: Resolver<
    ResolversTypes['VerificationToken'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateVerificationTokenArgs, 'verificationToken'>
  >;
  deleteSession?: Resolver<
    Maybe<ResolversTypes['AdapterSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteSessionArgs, 'sessionToken'>
  >;
  deleteUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'id'>
  >;
  linkAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationLinkAccountArgs, 'data'>
  >;
  unlinkAccount?: Resolver<
    Maybe<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<MutationUnlinkAccountArgs, 'providerInfo'>
  >;
  updateSession?: Resolver<
    Maybe<ResolversTypes['AdapterSession']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateSessionArgs, 'data'>
  >;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'user'>>;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getSessionAndUser?: Resolver<
    Maybe<ResolversTypes['SessionWithUser']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetSessionAndUserArgs, 'sessionToken'>
  >;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getUserByAccount?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByAccountArgs, 'providerInfo'>
  >;
  getUserByEmail?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByEmailArgs, 'email'>
  >;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SessionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']
> = {
  expires?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sessionToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SessionWithUserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['SessionWithUser'] = ResolversParentTypes['SessionWithUser']
> = {
  session?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerificationTokenResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['VerificationToken'] = ResolversParentTypes['VerificationToken']
> = {
  expires?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  identifier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Account?: AccountResolvers<ContextType>;
  AdapterSession?: AdapterSessionResolvers<ContextType>;
  AdapterUser?: AdapterUserResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionWithUser?: SessionWithUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VerificationToken?: VerificationTokenResolvers<ContextType>;
};
