import { Prisma } from '@prisma/client';

export const SELECT_BOOK_OVERVIEW = Prisma.validator<Prisma.BookDefaultArgs>()({
  select: {
    idx: true,
    title: true,
    author: true,
    coverImagePath: true,
    averageRating: true,
    ratingsCount: true,
    koreanTitle: true,
    koreanAuthor: true,
    koreanCoverPath: true,
  },
});
export type SelectBookOverview = Prisma.BookGetPayload<
  typeof SELECT_BOOK_OVERVIEW
>;
