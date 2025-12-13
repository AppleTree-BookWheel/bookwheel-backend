import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { SELECT_FRIEND, SelectFriend } from './model/prisma-type/select-friend';
import { FriendStatus } from './constants/friend-status.enum';
import {
  SELECT_FRIEND_OVERVIEW,
  SelectFriendOverview,
} from './model/prisma-type/select-friend-overview';

@Injectable()
export class FriendRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async insertFriendRequest(
    requestUserIdx: number,
    receiveUserIdx: number,
  ): Promise<SelectFriend> {
    return await this.txHost.tx.friend.create({
      ...SELECT_FRIEND,
      data: {
        requestUserIdx,
        receiveUserIdx,
        status: FriendStatus.PENDING,
      },
    });
  }

  public async selectReceivedFriendRequestsByUserIdx(
    userIdx: number,
  ): Promise<SelectFriendOverview[]> {
    return await this.txHost.tx.friend.findMany({
      ...SELECT_FRIEND_OVERVIEW,
      where: {
        receiveUserIdx: userIdx,
        status: FriendStatus.PENDING,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async selectFriendsByUserIdx(
    userIdx: number,
  ): Promise<SelectFriendOverview[]> {
    return await this.txHost.tx.friend.findMany({
      ...SELECT_FRIEND_OVERVIEW,
      where: {
        OR: [{ requestUserIdx: userIdx }, { receiveUserIdx: userIdx }],
        status: FriendStatus.ACCEPTED,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async selectFriendByIdx(idx: number): Promise<SelectFriend | null> {
    return await this.txHost.tx.friend.findUnique({
      ...SELECT_FRIEND,
      where: {
        idx,
        deletedAt: null,
      },
    });
  }

  public async selectFriendRelationByUserIdxs(
    userIdx1: number,
    userIdx2: number,
  ): Promise<SelectFriend | null> {
    return await this.txHost.tx.friend.findFirst({
      ...SELECT_FRIEND,
      where: {
        OR: [
          { requestUserIdx: userIdx1, receiveUserIdx: userIdx2 },
          { requestUserIdx: userIdx2, receiveUserIdx: userIdx1 },
        ],
        deletedAt: null,
      },
    });
  }

  public async updateFriendStatusByIdx(idx: number): Promise<void> {
    await this.txHost.tx.friend.update({
      where: { idx },
      data: {
        status: FriendStatus.ACCEPTED,
      },
    });
  }

  public async deleteFriendByIdx(idx: number): Promise<void> {
    await this.txHost.tx.friend.delete({
      where: { idx },
    });
  }
}
