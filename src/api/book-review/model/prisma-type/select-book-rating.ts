import { Prisma } from '@prisma/client';

export const SELECT_BOOK_RATING =
  Prisma.validator<Prisma.BookRatingDefaultArgs>()({
    select: {
      rating: true,
    },
  });

export type SelectBookRating = Prisma.BookRatingGetPayload<
  typeof SELECT_BOOK_RATING
>;
