import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreatePartyInput } from './inputs/create-party.input';
import { SELECT_PARTY, SelectParty } from './model/prisma-type/select-party';
import { PartyStatus } from './constants/party-status';
import { PartyMemberStatus } from './constants/party-member-status';
import {
  SELECT_PARTY_OVERVIEW,
  SelectPartyOverview,
} from './model/prisma-type/select-party-overview';
import { UpdatePartyInput } from './inputs/update-party.input';
import {
  SELECT_PARTY_MEMBER,
  SelectPartyMember,
} from './model/prisma-type/select-party-member';

@Injectable()
export class PartyRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async insertParty(
    hostUserIdx: number,
    input: Omit<CreatePartyInput, 'invitedUserIdxs'>,
  ): Promise<SelectParty> {
    return await this.txHost.tx.party.create({
      ...SELECT_PARTY,
      data: {
        hostUserIdx,
        bookIdx: input.bookIdx,
        title: input.title,
        description: input.description,
        maxMembers: input.maxMembers,
        currentMembers: 1,
        status: PartyStatus.OPEN,
        startDate: input.startDate,
        isPrivate: input.isPrivate,
        password: input.password ?? null,

        memberships: {
          create: {
            userIdx: hostUserIdx,
            status: PartyMemberStatus.JOINED,
          },
        },
      },
    });
  }

  public async insertPartyMember(
    userIdx: number,
    partyIdx: number,
  ): Promise<void> {
    await this.txHost.tx.party.update({
      where: { idx: partyIdx },
      data: {
        currentMembers: {
          increment: 1,
        },

        memberships: {
          create: {
            userIdx: userIdx,
            status: PartyMemberStatus.JOINED,
          },
        },
      },
    });
  }

  public async selectPartyMembersByIdx(
    partyIdx: number,
  ): Promise<SelectPartyMember[]> {
    return await this.txHost.tx.partyMember.findMany({
      ...SELECT_PARTY_MEMBER,
      where: {
        partyIdx: partyIdx,
        status: PartyMemberStatus.JOINED,
      },
    });
  }

  public async selectPartyMemberByUserAndPartyIdx(
    userIdx: number,
    partyIdx: number,
  ): Promise<SelectPartyMember | null> {
    return await this.txHost.tx.partyMember.findFirst({
      ...SELECT_PARTY_MEMBER,
      where: {
        userIdx: userIdx,
        partyIdx: partyIdx,
      },
    });
  }

  public async selectPartyOverviews(): Promise<SelectPartyOverview[]> {
    return await this.txHost.tx.party.findMany({
      ...SELECT_PARTY_OVERVIEW,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        deletedAt: null,
        status: PartyStatus.OPEN,
      },
    });
  }

  public async selectPartyOverviewByKeyword(
    keyword: string,
  ): Promise<SelectPartyOverview[]> {
    return await this.txHost.tx.party.findMany({
      ...SELECT_PARTY_OVERVIEW,
      where: {
        deletedAt: null,
        status: PartyStatus.OPEN,
        OR: [
          {
            title: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: keyword,
              mode: 'insensitive',
            },
          },
          {
            book: {
              title: {
                contains: keyword,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async selectPartyByIdx(partyIdx: number): Promise<SelectParty | null> {
    return await this.txHost.tx.party.findFirst({
      ...SELECT_PARTY,
      where: {
        idx: partyIdx,
        deletedAt: null,
      },
    });
  }

  public async selectPartyPasswordByIdx(
    partyIdx: number,
  ): Promise<string | null> {
    const party = await this.txHost.tx.party.findUnique({
      where: { idx: partyIdx },
      select: {
        password: true,
      },
    });

    return party ? party.password : null;
  }

  public async selectHostedPartyByUserIdx(
    userIdx: number,
  ): Promise<SelectPartyOverview[]> {
    return await this.txHost.tx.party.findMany({
      ...SELECT_PARTY_OVERVIEW,
      where: {
        hostUserIdx: userIdx,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async selectJoinedPartyByUserIdx(
    userIdx: number,
  ): Promise<SelectPartyOverview[]> {
    return await this.txHost.tx.party.findMany({
      ...SELECT_PARTY_OVERVIEW,
      where: {
        memberships: {
          some: {
            userIdx: userIdx,
            status: PartyMemberStatus.JOINED,
          },
        },
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async updatePartyByUserAndPartyIdx(
    userIdx: number,
    input: UpdatePartyInput,
  ): Promise<void> {
    await this.txHost.tx.party.updateMany({
      where: {
        idx: input.partyIdx,
        hostUserIdx: userIdx,
        deletedAt: null,
      },
      data: {
        title: input.title,
        description: input.description,
        maxMembers: input.maxMembers,
        startDate: input.startDate,
        isPrivate: input.isPrivate,
        password: input.password ?? null,
      },
    });
  }

  public async deletePartyByUserAndPartyIdx(
    userIdx: number,
    partyIdx: number,
  ): Promise<void> {
    await this.txHost.tx.party.updateMany({
      where: {
        idx: partyIdx,
        hostUserIdx: userIdx,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async deletePartyMemberByUserAndPartyIdx(
    userIdx: number,
    partyIdx: number,
  ): Promise<void> {
    await this.txHost.tx.party.update({
      where: { idx: partyIdx },
      data: {
        currentMembers: {
          decrement: 1,
        },

        memberships: {
          updateMany: {
            where: {
              userIdx: userIdx,
              partyIdx: partyIdx,
            },
            data: {
              status: PartyMemberStatus.LEFT,
            },
          },
        },
      },
    });
  }
}
