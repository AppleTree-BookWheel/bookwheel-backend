import { Prisma } from '@prisma/client';

export const SELECT_PARTY_OVERVIEW =
  Prisma.validator<Prisma.PartyDefaultArgs>()({
    select: {
      idx: true,
      title: true,
      description: true,

      book: {
        select: {
          idx: true,
          coverImagePath: true,
        },
      },
    },
  });

export type SelectPartyOverview = Prisma.PartyGetPayload<
  typeof SELECT_PARTY_OVERVIEW
>;
