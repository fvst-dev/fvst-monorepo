import { Injectable } from '@nestjs/common';
import { Prisma } from '@~internal/blog_graphql/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getComment(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: { post: true },
    });
  }

  async getComments() {
    return this.prisma.comment.findMany({ include: { post: true } });
  }

  async createComment(commentData: Prisma.CommentCreateInput) {
    return this.prisma.comment.create({
      data: commentData,
    });
  }

  async updateComment(params: { id: number; text?: string }) {
    const { id, ...data } = params;
    return this.prisma.comment.update({
      data,
      where: { id },
    });
  }

  async deleteComment(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
