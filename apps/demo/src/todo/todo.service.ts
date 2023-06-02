import { Injectable } from '@nestjs/common';
import { Prisma } from '@~internal/prisma_demo/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PrismaService } from '@packages/prisma/dist/prisma.service';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('todo') private readonly todoQueue: Queue,
  ) {}

  async create(data: Prisma.TodoCreateInput) {
    await this.todoQueue.add('info', {
      data,
    });
    return this.prisma.client.todo.create({ data });
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
