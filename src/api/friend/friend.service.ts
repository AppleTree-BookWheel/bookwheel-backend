import { Injectable } from '@nestjs/common';
import { FriendRepository } from './friend.repository';
import { FriendOverviewModel } from './model/friend-overview.model';

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}

  public async createFriendRequest(
    requestUserIdx: number,
    receiveUserIdx: number,
  ): Promise<void> {
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
}
