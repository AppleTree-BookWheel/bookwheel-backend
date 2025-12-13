export class GetFriendOverviewResponseDto {
  friendshipIdx: number;
  friendUserIdx: number;
  nickname: string;
  profileImagePath: string | null;

  status: string;
  createdAt: Date;
}
