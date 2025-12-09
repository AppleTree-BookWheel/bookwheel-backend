import { Prisma } from '@prisma/client';

export const SELECT_MY_BOOK =
  Prisma.validator<Prisma.MyBookProgressDefaultArgs>()({
    select: {
      progress: true,
      updatedAt: true,

      book: {
        select: {
          idx: true,
          title: true,
          coverImagePath: true,
          author: true,
          publicationYear: true,
        },
      },
    },
  });

export type SelectMyBook = Prisma.MyBookProgressGetPayload<
  typeof SELECT_MY_BOOK
>;
