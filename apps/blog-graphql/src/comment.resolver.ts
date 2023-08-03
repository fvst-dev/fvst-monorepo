import { Args, Mutation, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(() => Comment, { nullable: true })
  async comment(@Args('id') id: number) {
    return this.commentService.getComment(id);
  }

  @Query(() => [Comment])
  async comments() {
    return this.commentService.getComments();
  }

  @Mutation(() => Comment)
  async createComment(@Args('text') text: string, @Args('postId') postId: number) {
    return this.commentService.createComment({
      text,
      post: {
        connect: { id: postId },
      },
    });
  }

  @Mutation(() => Comment, { nullable: true })
  async updateComment(@Args('id') id: number, @Args('text') text: string) {
    return this.commentService.updateComment({ id, text });
  }

  @Mutation(() => Comment, { nullable: true })
  async deleteComment(@Args('id') id: number) {
    return this.commentService.deleteComment(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.commentService.getComment(parseInt(reference.id));
  }
}
