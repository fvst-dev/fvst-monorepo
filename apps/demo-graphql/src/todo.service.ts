import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@~internal/prisma_demo/client';
import { CreateTodoInput } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateTodoInput) {
    const { title, completed } = input;
    const todo = await this.prisma.todo.create({
      data: {
        title,
        completed,
      },
    });
    return todo;
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.TodoUpdateInput) {
    return this.prisma.todo.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}