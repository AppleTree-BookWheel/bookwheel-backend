import { Prisma } from '@prisma/client';
import { SELECT_USER_BASIC } from './select-user-basic';
import { SELECT_USER_SOCIAL } from './select-user-social';

export const SELECT_USER = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    idx: true,
    nickname: true,
    profileImagePath: true,
    type: true,
    age: true,
    createdAt: true,

    basicAuths: SELECT_USER_BASIC,
    socialAuths: SELECT_USER_SOCIAL,
  },
});

export type SelectUser = Prisma.UserGetPayload<typeof SELECT_USER>;
