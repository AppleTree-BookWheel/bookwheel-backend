import { Prisma } from '@prisma/client';

export const SELECT_FRIEND = Prisma.validator<Prisma.FriendDefaultArgs>()({
  select: {
    idx: true,
    status: true,
    createdAt: true,

    // 신청자 정보
    requestUserIdx: true,
    requestUser: {
      select: {
        idx: true,
        nickname: true,
        profileImagePath: true,

        // 설문 응답
        surveyResponses: {
          select: {
            optionIdx: true, // 프론트엔드가 식별할 핵심 키
            option: { select: { content: true } },
          },
        },
      },
    },

    // 수신자 정보
    receiveUserIdx: true,
    receiveUser: {
      select: {
        idx: true,
        nickname: true,
        profileImagePath: true,

        surveyResponses: {
          select: {
            optionIdx: true,
            option: { select: { content: true } },
          },
        },
      },
    },
  },
});

export type SelectFriend = Prisma.FriendGetPayload<typeof SELECT_FRIEND>;
