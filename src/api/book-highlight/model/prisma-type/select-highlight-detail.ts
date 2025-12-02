import { Prisma } from '@prisma/client';

export const SELECT_HIGHLIGHT_DETAIL =
  Prisma.validator<Prisma.BookHighlightDefaultArgs>()({
    select: {
      // 1. 하이라이트 기본 정보
      idx: true,
      userIdx: true,
      bookIdx: true,
      partyIdx: true,
      cfiRange: true,
      colorCode: true,
      createdAt: true,

      // 2. 하이라이트 작성자 정보 (User)
      user: {
        select: {
          idx: true,
          nickname: true,
          profileImagePath: true,
        },
      },

      // 3. 댓글 목록 (Comments)
      comments: {
        select: {
          idx: true,
          content: true,
          createdAt: true,
          userIdx: true, // 내 댓글인지 판별용

          // 4. 댓글 작성자 정보 (Comment -> User)
          user: {
            select: {
              idx: true,
              nickname: true,
              profileImagePath: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc', // 댓글은 시간순 정렬
        },
      },
    },
  });

export type SelectHighlightDetail = Prisma.BookHighlightGetPayload<
  typeof SELECT_HIGHLIGHT_DETAIL
>;
