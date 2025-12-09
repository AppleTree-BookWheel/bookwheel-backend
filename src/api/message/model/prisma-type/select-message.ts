import { Prisma } from '@prisma/client';

// 쪽지 기본 정보 + 상대방 유저 정보 조회용
export const SELECT_MESSAGE = Prisma.validator<Prisma.MessageDefaultArgs>()({
  select: {
    idx: true,
    senderIdx: true,
    receiverIdx: true,
    content: true,
    isRead: true,
    sentAt: true,

    // 보낸 사람 정보 (받은 쪽지함용)
    sender: {
      select: {
        idx: true,
        nickname: true,
        profileImagePath: true,
      },
    },

    // 받는 사람 정보 (보낸 쪽지함용)
    receiver: {
      select: {
        idx: true,
        nickname: true,
        profileImagePath: true,
      },
    },
  },
});

export type SelectMessage = Prisma.MessageGetPayload<typeof SELECT_MESSAGE>;
