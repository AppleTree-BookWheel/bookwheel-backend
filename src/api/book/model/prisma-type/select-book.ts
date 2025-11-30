import { Prisma } from '@prisma/client';

export const SELECT_BOOK = Prisma.validator<Prisma.BookDefaultArgs>()({
  select: {
    idx: true,
    title: true,
    author: true,
    publisher: true,
    publicationYear: true,
    description: true,
    bookFilePath: true,
    coverImagePath: true,
    averageRating: true,
    ratingsCount: true,
    languageCode: true,
    isbn13: true,
    koreanTitle: true,
    koreanAuthor: true,
    koreanCoverPath: true,
    createdAt: true,
  },
});

export type SelectBook = Prisma.BookGetPayload<typeof SELECT_BOOK>;
