export class CreatePartyInput {
  bookIdx: number;
  title: string;
  description: string;
  maxMembers: number;
  startDate?: Date;
  isPrivate: boolean;
  password?: string;
}
