import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Todo as PrismaTodo } from '@~internal/todo_graphql/client';

@ObjectType()
export class Todo implements PrismaTodo {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field()
  userId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  completed?: boolean;
}

@InputType()
export class UpdateTodoInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
