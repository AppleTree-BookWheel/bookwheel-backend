import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FriendRepository } from './friend.repository';
import { FriendOverviewModel } from './model/friend-overview.model';
import { FriendModel } from './model/friend.model';
import { FriendStatus } from './constants/friend-status.enum';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  public async createFriendRequest(
    requestUserIdx: number,
    receiveUserIdx: number,
  ): Promise<void> {
    if (requestUserIdx === receiveUserIdx) {
      throw new BadRequestException(
        'You cannot send a friend request to yourself',
      );
    }

    const existingRelation =
      await this.friendRepository.selectFriendRelationByUserIdxs(
        requestUserIdx,
        receiveUserIdx,
      );

    if (existingRelation) {
      if (existingRelation.status === FriendStatus.ACCEPTED) {
        throw new BadRequestException('You are already friends with this user');
      }
      throw new ConflictException(
        'A friend request already exists between these users',
      );
    }

    await this.friendRepository.insertFriendRequest(
      requestUserIdx,
      receiveUserIdx,
    );
  }

  public async getReceivedFriendRequestsByUserIdx(
    userIdx: number,
  ): Promise<FriendOverviewModel[]> {
    const response =
      await this.friendRepository.selectReceivedFriendRequestsByUserIdx(
        userIdx,
      );
    return response.map((data) =>
      FriendOverviewModel.fromPrisma(data, userIdx),
    );
  }

  public async getFriendsByUserIdx(
    userIdx: number,
  ): Promise<FriendOverviewModel[]> {
    const response =
      await this.friendRepository.selectFriendsByUserIdx(userIdx);
    return response.map((data) =>
      FriendOverviewModel.fromPrisma(data, userIdx),
    );
  }

  public async getFriendByIdx(
    idx: number,
    myUserIdx: number,
  ): Promise<FriendModel | null> {
    const response = await this.friendRepository.selectFriendByIdx(idx);
    if (!response) {
      return null;
    }
    return FriendModel.fromPrisma(response, myUserIdx);
  }

  public async acceptFriendRequestByUserAndFriendIdx(
    userIdx: number,
    friendIdx: number,
  ): Promise<void> {
    const response = await this.friendRepository.selectFriendByIdx(friendIdx);
    if (!response) {
      throw new NotFoundException('Friend request not found');
    }

    if (response.receiveUserIdx !== userIdx) {
      throw new ForbiddenException(
        'You are not authorized to accept this friend request',
      );
    }

    if (response.status !== FriendStatus.PENDING) {
      throw new BadRequestException('Friend request is not in a pending state');
    }

    await this.friendRepository.updateFriendStatusByIdx(friendIdx);
  }

  public async deleteFriendByUserAndFriendIdx(
    userIdx: number,
    friendIdx: number,
  ): Promise<void> {
    const response = await this.friendRepository.selectFriendByIdx(friendIdx);
    if (!response) {
      throw new NotFoundException('Friend relationship not found');
    }

    if (
      response.requestUserIdx !== userIdx &&
      response.receiveUserIdx !== userIdx
    ) {
      throw new ForbiddenException(
        'You are not authorized to delete this friend relationship',
      );
    }

    await this.friendRepository.deleteFriendByIdx(friendIdx);
  }
}
