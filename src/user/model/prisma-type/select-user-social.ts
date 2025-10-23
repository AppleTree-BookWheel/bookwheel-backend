import { Prisma } from '@prisma/client';

export const SELECT_USER_SOCIAL =
  Prisma.validator<Prisma.UserSocialDefaultArgs>()({
    select: {
      providerName: true,
      snsId: true,
    },
  });

export type SelectUserSocial = Prisma.UserSocialGetPayload<
  typeof SELECT_USER_SOCIAL
>;
