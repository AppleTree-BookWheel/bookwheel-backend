import { Prisma } from '@prisma/client';

export const SELECT_PARTY = Prisma.validator<Prisma.PartyDefaultArgs>()({
  select: {
    idx: true,
    hostUserIdx: true,
    bookIdx: true,
    title: true,
    description: true,
    maxMembers: true,
    currentMembers: true,
    status: true,
    startDate: true,
    isPrivate: true,
    createdAt: true,
  },
});

export type SelectParty = Prisma.PartyGetPayload<typeof SELECT_PARTY>;
