import { Prisma } from '@prisma/client';

export const SELECT_FRIEND_OVERVIEW =
  Prisma.validator<Prisma.FriendDefaultArgs>()({
    select: {
      idx: true,
      status: true,
      createdAt: true,

      requestUserIdx: true,
      requestUser: {
        select: {
          idx: true,
          nickname: true,
          profileImagePath: true,
        },
      },

      receiveUserIdx: true,
      receiveUser: {
        select: {
          idx: true,
          nickname: true,
          profileImagePath: true,
        },
      },
    },
  });

export type SelectFriendOverview = Prisma.FriendGetPayload<
  typeof SELECT_FRIEND_OVERVIEW
>;
