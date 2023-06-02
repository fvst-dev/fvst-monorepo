// comment.entity.ts
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Post } from './post.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Comment {
  @Field((type) => ID)
  id: number;

  @Field()
  text: string;

  @Field()
  postId: number;

  @Field((type) => Post)
  post: Post;
}
