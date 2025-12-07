import { SelectPartyOverview } from './prisma-type/select-party-overview';

export class PartyOverviewModel {
  idx: number;
  title: string;
  description: string;

  bookIdx: number;
  bookCoverImagePath: string;

  constructor(data: PartyOverviewModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectPartyOverview): PartyOverviewModel {
    return new PartyOverviewModel({
      idx: data.idx,
      title: data.title,
      description: data.description,

      bookIdx: data.book.idx,
      bookCoverImagePath: data.book.coverImagePath,
    });
  }
}
