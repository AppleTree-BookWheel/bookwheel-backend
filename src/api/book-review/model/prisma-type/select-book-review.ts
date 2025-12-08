import { Prisma } from '@prisma/client';

export const SELECT_BOOK_REVIEW =
  Prisma.validator<Prisma.BookReviewDefaultArgs>()({
    select: {
      idx: true,
      bookIdx: true,
      userIdx: true,
      content: true,
      createdAt: true,
    },
  });

export type SelectBookReview = Prisma.BookReviewGetPayload<
  typeof SELECT_BOOK_REVIEW
>;
