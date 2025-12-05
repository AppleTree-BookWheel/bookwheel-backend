export class CreatePartyInput {
  bookIdx: number;
  title: string;
  description: string;
  maxMembers: number;
  startDate?: Date;
  isPrivate: boolean;
  password?: string;
  // 유저 초대 기능을 위한 필드
  invitedUserIdxs?: number[];
}
