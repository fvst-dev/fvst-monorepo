import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma/dist/prisma.service';
import { Post } from './post.entity';
import { Prisma } from '@~internal/prisma_demo/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(id: number): Promise<Post | null> {
    return this.prisma.client.post.findUnique({
      where: { id: parseInt(id.toString(), 10) },
      include: { comments: true },
    });
  }

  async getPosts(): Promise<Post[]> {
    return this.prisma.client.post.findMany({ include: { comments: true } });
  }

  async createPost(postData: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.client.post.create({
      data: postData,
    });
  }

  async updatePost(params: {
    id: number;
    title?: string;
    content?: string;
  }): Promise<Post> {
    const { id, ...data } = params;
    return this.prisma.client.post.update({
      data,
      where: { id },
    });
  }

  async deletePost(id: number): Promise<Post> {
    return this.prisma.client.post.delete({
      where: { id },
    });
  }

  async forAuthor(authorId: number): Promise<Post[]> {
    return this.prisma.client.post.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        comments: true,
      },
    });
  }
}
