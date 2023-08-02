// comment.entity.ts
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Post } from './post.entity';

// https://github.com/nestjs/graphql/issues/2568
type Type<T> = T;

@ObjectType()
@Directive('@key(fields: "id")')
export class Comment {
  @Field(() => ID)
  id: number;

  @Field()
  text: string;

  @Field()
  postId: number;

  @Field(() => Post)
  post: Type<Post>;
}
