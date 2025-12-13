export class GetFriendResponseDto {
  friendshipIdx: number;
  friendUserIdx: number;
  nickname: string;
  profileImagePath: string | null;
  surveyOptionIdxs: number[];

  status: string;
  createdAt: Date;
}
