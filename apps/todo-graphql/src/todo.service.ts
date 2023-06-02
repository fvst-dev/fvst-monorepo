import { Injectable } from '@nestjs/common';
import { Prisma } from '@~internal/prisma_demo/client';
import { CreateTodoInput } from './todo.entity';
import { PrismaService } from '@libs/prisma/dist/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateTodoInput) {
    const { title, completed } = input;
    const todo = await this.prisma.client.todo.create({
      data: {
        title,
        completed,
      },
    });
    return todo;
  }

  async findAll() {
    return this.prisma.client.todo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.client.todo.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.TodoUpdateInput) {
    return this.prisma.client.todo.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.client.todo.delete({ where: { id } });
  }
}
