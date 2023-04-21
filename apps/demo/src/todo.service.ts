import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Todo, Prisma } from '@~internal/prisma_demo/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({ data });
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
