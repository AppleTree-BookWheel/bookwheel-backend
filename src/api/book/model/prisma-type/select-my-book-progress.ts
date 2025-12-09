import { Prisma } from '@prisma/client';

export const SELECT_MY_BOOK_PROGRESS =
  Prisma.validator<Prisma.MyBookProgressDefaultArgs>()({
    select: {
      currentCfiPosition: true,
      progress: true,
      updatedAt: true,
    },
  });

export type SelectMyBookProgress = Prisma.MyBookProgressGetPayload<
  typeof SELECT_MY_BOOK_PROGRESS
>;
