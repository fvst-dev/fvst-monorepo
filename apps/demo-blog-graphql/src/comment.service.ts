import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma/dist/prisma.service';
import { Comment } from './comment.entity';
import { Prisma } from '@~internal/prisma_demo/client';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getComment(id: number): Promise<Comment | null> {
    return this.prisma.client.comment.findUnique({
      where: { id },
      include: { post: true },
    });
  }

  async getComments(): Promise<Comment[]> {
    return this.prisma.client.comment.findMany({ include: { post: true } });
  }

  async createComment(
    commentData: Prisma.CommentCreateInput,
  ): Promise<Comment> {
    return this.prisma.client.comment.create({
      data: commentData,
    });
  }

  async updateComment(params: { id: number; text?: string }): Promise<Comment> {
    const { id, ...data } = params;
    return this.prisma.client.comment.update({
      data,
      where: { id },
    });
  }

  async deleteComment(id: number): Promise<Comment> {
    return this.prisma.client.comment.delete({
      where: { id },
    });
  }
}
