import { Prisma } from '@prisma/client';

export const SELECT_COMMENT = Prisma.validator<Prisma.BookCommentDefaultArgs>()(
  {
    select: {
      idx: true,
      userIdx: true,
      highlightIdx: true,
      bookIdx: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          nickname: true,
          profileImagePath: true,
        },
      },
    },
  },
);

export type SelectComment = Prisma.BookCommentGetPayload<typeof SELECT_COMMENT>;
