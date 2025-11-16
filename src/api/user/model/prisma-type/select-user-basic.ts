import { Prisma } from '@prisma/client';

export const SELECT_USER_BASIC =
  Prisma.validator<Prisma.UserBasicDefaultArgs>()({
    select: {
      id: true,
      email: true,
    },
  });

export type SelectUserBasic = Prisma.UserBasicGetPayload<
  typeof SELECT_USER_BASIC
>;
