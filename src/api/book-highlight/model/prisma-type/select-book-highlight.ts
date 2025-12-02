import { Prisma } from '@prisma/client';

export const SELECT_BOOK_HIGHLIGHT =
  Prisma.validator<Prisma.BookHighlightDefaultArgs>()({
    select: {
      idx: true,
      userIdx: true,
      bookIdx: true,
      partyIdx: true,
      cfiRange: true,
      colorCode: true,
      createdAt: true,
    },
  });

export type SelectBookHighlight = Prisma.BookHighlightGetPayload<
  typeof SELECT_BOOK_HIGHLIGHT
>;
