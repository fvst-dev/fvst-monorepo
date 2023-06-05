import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Todo, CreateTodoInput, UpdateTodoInput } from './todo.entity';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from './auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';
import { User } from './types';

@UseGuards(JwtAuthGuard)
@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  async todos() {
    return this.todoService.findAll();
  }
  @Mutation(() => Todo)
  async createTodo(
    @Args('input') input: CreateTodoInput,
    @CurrentUser() user: User,
  ): Promise<Todo> {
    return await this.todoService.create({
      ...input,
      userId: user.userId,
    });
  }
  @Mutation(() => Todo)
  async updateTodo(@Args('input') input: UpdateTodoInput): Promise<Todo> {
    return this.todoService.update(input.id, {
      title: input.title,
      completed: input.completed,
    });
  }
  @Mutation(() => Todo)
  async deleteTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.delete(id);
  }
}
