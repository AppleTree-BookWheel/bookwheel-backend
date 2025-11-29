import { Prisma } from '@prisma/client';

// 친구 검색 등 공개용 유저 정보
export const SELECT_PUBLIC_USER = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    idx: true,
    nickname: true,
    profileImagePath: true,
    age: true,
    gender: true,
  },
});

export type SelectPublicUser = Prisma.UserGetPayload<typeof SELECT_PUBLIC_USER>;
