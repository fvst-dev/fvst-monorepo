import { prisma, Prisma } from '../../../prisma';

export const create = async (input: Prisma.PostCreateInput) => {
  return await prisma.post.create({
    data: input,
    select: {
      id: true,
      title: true,
      text: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
