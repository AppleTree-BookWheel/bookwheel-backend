import { SelectPartyBookProgress } from './prisma-type/select-party-book-progress';

export class PartyBookProgressModel {
  currentCfiPosition: string;
  progress: number;
  updatedAt: Date;

  constructor(data: PartyBookProgressModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectPartyBookProgress): PartyBookProgressModel {
    return new PartyBookProgressModel({
      currentCfiPosition: data.currentCfiPosition,
      progress: data.progress,
      updatedAt: data.updatedAt,
    });
  }
}
