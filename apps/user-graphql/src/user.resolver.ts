import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, User } from './user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User, { nullable: true })
  async getUser(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Query((returns) => [User])
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation((returns) => User)
  createUser(@Args('user') user: CreateUserInput): Promise<User> {
    return this.userService.create(user);
  }

  @Mutation((returns) => User)
  updateUser(
    @Args({ name: 'id', type: () => ID }) id: number,
    @Args('user') user: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Mutation((returns) => User)
  async deleteUser(
    @Args({ name: 'id', type: () => ID }) id: number,
  ): Promise<User> {
    return this.userService.delete(id);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<User> {
    return this.userService.findById(reference.id);
  }
}
