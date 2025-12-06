import { Prisma } from '@prisma/client';

export const SELECT_PARTY_MEMBER =
  Prisma.validator<Prisma.PartyMemberDefaultArgs>()({
    select: {
      partyIdx: true,
      userIdx: true,
      status: true,

      user: {
        select: {
          nickname: true,
          profileImagePath: true,
        },
      },
    },
  });

export type SelectPartyMember = Prisma.PartyMemberGetPayload<
  typeof SELECT_PARTY_MEMBER
>;
