import { Prisma } from '@prisma/client';

export const SELECT_MY_HIGHLIGHT =
  Prisma.validator<Prisma.BookHighlightDefaultArgs>()({
    select: {
      idx: true,
      content: true,
      cfiRange: true,
      createdAt: true,

      // 댓글 개수
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

export type SelectMyHighlight = Prisma.BookHighlightGetPayload<
  typeof SELECT_MY_HIGHLIGHT
>;
