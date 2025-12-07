export class GetPartyResponseDto {
  idx: number;
  hostUserIdx: number;
  bookIdx: number;
  title: string;
  description: string;
  maxMembers: number;
  currentMembers: number;
  status: string;
  startDate: Date | null;
  isPrivate: boolean;
  createdAt: Date;
  bookTitle: string;
  bookCoverImagePath: string;
}
