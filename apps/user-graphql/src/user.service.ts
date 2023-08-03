import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@~internal/user_graphql/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { id: parseInt(id.toString(), 10) },
    });
  }

  async findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany();
  }

  async create(userData: Prisma.UserCreateInput): Promise<PrismaUser> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  async update(id: number, userData: Prisma.UserUpdateInput): Promise<PrismaUser> {
    // Check if user exists
    const existingUser = await this.findById(id);
    if (!existingUser) throw new NotFoundException(`User with id ${id} not found`);

    return this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id: number): Promise<PrismaUser> {
    // Check if user exists
    const existingUser = await this.findById(id);
    if (!existingUser) throw new NotFoundException(`User with id ${id} not found`);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
