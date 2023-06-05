import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { Prisma } from '@~internal/blog_graphql/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(id: number) {
    return this.prisma.post.findUnique({
      where: { id: parseInt(id.toString(), 10) },
      include: { comments: true },
    });
  }

  async getPosts() {
    return this.prisma.post.findMany({ include: { comments: true } });
  }

  async createPost(postData: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data: postData,
    });
  }

  async updatePost(params: {
    id: number;
    title?: string;
    content?: string;
  }): Promise<Post> {
    const { id, ...data } = params;
    return this.prisma.post.update({
      data,
      where: { id },
    });
  }

  async deletePost(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }

  async forAuthor(authorId: number) {
    return this.prisma.post.findMany({
      where: {
        authorId: authorId,
      },
      include: {
        comments: true,
      },
    });
  }
}