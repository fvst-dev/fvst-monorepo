import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { User } from './user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => Post, { nullable: true })
  async post(@Args('id') id: number) {
    return this.postService.getPost(id);
  }

  @Query(() => [Post], { nullable: true })
  async posts() {
    return this.postService.getPosts();
  }

  @Mutation(() => Post)
  async createPost(@Args('title') title: string, @Args('content') content: string, @Args('authorId') authorId: number) {
    return this.postService.createPost({ title, content, authorId });
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(@Args('id') id: number, @Args('title') title: string, @Args('content') content: string) {
    return this.postService.updatePost({ id, title, content });
  }

  @Mutation(() => Post, { nullable: true })
  async deletePost(@Args('id') id: number) {
    return this.postService.deletePost(id);
  }

  @ResolveField(() => User)
  user(@Parent() post: Post) {
    return { __typename: 'User', id: post.authorId };
  }
}
