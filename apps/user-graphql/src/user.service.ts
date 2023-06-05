import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@packages/prisma/dist/prisma.service';
import { Prisma, User as PrismaUser } from '@~internal/prisma_demo/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<PrismaUser | null> {
    return this.prisma.client.user.findUnique({
      where: { id: parseInt(id.toString(), 10) },
    });
  }

  async findAll(): Promise<PrismaUser[]> {
    return this.prisma.client.user.findMany();
  }

  async create(userData: Prisma.UserCreateInput): Promise<PrismaUser> {
    return this.prisma.client.user.create({
      data: userData,
    });
  }

  async update(
    id: number,
    userData: Prisma.UserUpdateInput,
  ): Promise<PrismaUser> {
    // Check if user exists
    const existingUser = await this.findById(id);
    if (!existingUser)
      throw new NotFoundException(`User with id ${id} not found`);

    return this.prisma.client.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: number): Promise<PrismaUser> {
    // Check if user exists
    const existingUser = await this.findById(id);
    if (!existingUser)
      throw new NotFoundException(`User with id ${id} not found`);

    return this.prisma.client.user.delete({
      where: { id },
    });
  }
}
