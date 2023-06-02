// post.entity.ts
import { ObjectType, Field, ID, Directive, Int } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  published: boolean;

  @Field((type) => Int, { nullable: true })
  authorId: number;

  @Field((type) => User, { nullable: true })
  user?: User;

  @Field((type) => [Comment], { nullable: true })
  comments?: Comment[];
}
