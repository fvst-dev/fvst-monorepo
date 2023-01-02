import { prisma } from '../../../prisma';

export const findById = async (id: string) => {
  return await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      text: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
