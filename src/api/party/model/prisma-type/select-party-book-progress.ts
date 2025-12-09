import { Prisma } from '@prisma/client';

export const SELECT_PARTY_BOOK_PROGRESS =
  Prisma.validator<Prisma.PartyBookProgressDefaultArgs>()({
    select: {
      currentCfiPosition: true,
      progress: true,
      updatedAt: true,
    },
  });

export type SelectPartyBookProgress = Prisma.PartyBookProgressGetPayload<
  typeof SELECT_PARTY_BOOK_PROGRESS
>;
