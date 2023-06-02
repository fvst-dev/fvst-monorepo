import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { User } from './user.entity';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly postsService: PostService) {}

  @ResolveField((of) => [Post])
  async posts(@Parent() user: User) {
    return this.postsService.forAuthor(user.id);
  }
}
