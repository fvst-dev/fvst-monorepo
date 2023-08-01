import { Injectable } from '@nestjs/common';
import { Prisma } from '@~internal/todo_graphql/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(input: Prisma.TodoCreateInput) {
    const { title, completed, userId } = input;
    return await this.prisma.todo.create({
      data: {
        title,
        completed,
        userId,
      },
    });
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
