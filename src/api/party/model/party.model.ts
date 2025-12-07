import { SelectParty } from './prisma-type/select-party';

export class PartyModel {
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

  constructor(data: PartyModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectParty): PartyModel {
    return new PartyModel({
      idx: data.idx,
      hostUserIdx: data.hostUserIdx,
      bookIdx: data.bookIdx,
      title: data.title,
      description: data.description,
      maxMembers: data.maxMembers,
      currentMembers: data.currentMembers,
      status: data.status,
      startDate: data.startDate,
      isPrivate: data.isPrivate,
      createdAt: data.createdAt,

      bookTitle: data.book.title,
      bookCoverImagePath: data.book.coverImagePath,
    });
  }
}
