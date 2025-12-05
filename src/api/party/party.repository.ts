import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreatePartyInput } from './inputs/create-party.input';
import { SELECT_PARTY, SelectParty } from './model/prisma-type/select-party';
import { PartyStatus } from './constants/party-status';
import { PartyMemberStatus } from './constants/party-member-status';

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
    await this.txHost.tx.partyMember.create({
      data: {
        partyIdx,
        userIdx,
        status: PartyMemberStatus.JOINED,
      },
    });
  }
}
