import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Todo as PrismaTodo } from '@~internal/prisma_demo_graphql/client';

@ObjectType()
export class Todo implements PrismaTodo {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  completed: boolean;

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
  id: number = 0;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  completed?: boolean;
}
