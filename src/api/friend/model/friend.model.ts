import { SelectFriend } from './prisma-type/select-friend';

export class FriendModel {
  friendshipIdx: number;
  friendUserIdx: number;
  nickname: string;
  profileImagePath: string | null;

  surveyOptionIdxs: number[];

  status: string;
  createdAt: Date;

  constructor(data: FriendModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectFriend, myUserIdx: number): FriendModel {
    const isMeRequestor = data.requestUserIdx === myUserIdx;
    const friend = isMeRequestor ? data.receiveUser : data.requestUser;

    const optionIdxs = friend.surveyResponses.map((res) => res.optionIdx);

    return new FriendModel({
      friendshipIdx: data.idx,
      friendUserIdx: friend.idx,
      nickname: friend.nickname,
      profileImagePath: friend.profileImagePath,

      surveyOptionIdxs: optionIdxs,

      status: data.status,
      createdAt: data.createdAt,
    });
  }
}
