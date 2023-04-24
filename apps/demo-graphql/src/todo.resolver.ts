import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Todo, CreateTodoInput, UpdateTodoInput } from './todo.entity';
import { TodoService } from './todo.service';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  async todos() {
    return this.todoService.findAll();
  }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    return await this.todoService.create(input);
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
