import { SelectFriendOverview } from './prisma-type/select-friend-overview';

export class FriendOverviewModel {
  friendshipIdx: number; // 친구 관계 식별자 (삭제 시 필요)

  // 친구 정보 (상대방)
  friendUserIdx: number;
  nickname: string;
  profileImagePath: string | null;

  status: string;
  createdAt: Date;

  constructor(data: FriendOverviewModel) {
    Object.assign(this, data);
  }

  static fromPrisma(
    data: SelectFriendOverview,
    myUserIdx: number,
  ): FriendOverviewModel {
    // 1. 내가 요청자(requestUser)라면? -> 친구는 수신자(receiveUser)
    // 2. 내가 수신자(receiveUser)라면? -> 친구는 요청자(requestUser)
    const isMeRequestor = data.requestUserIdx === myUserIdx;

    const friend = isMeRequestor ? data.receiveUser : data.requestUser;

    return new FriendOverviewModel({
      friendshipIdx: data.idx,

      // 걸러낸 친구 정보 매핑
      friendUserIdx: friend.idx,
      nickname: friend.nickname,
      profileImagePath: friend.profileImagePath,

      status: data.status,
      createdAt: data.createdAt,
    });
  }
}
