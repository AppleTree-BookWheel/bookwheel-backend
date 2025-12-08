import { SelectMyBookProgress } from './prisma-type/select-my-book-progress';

export class MyBookProgressModel {
  currentCfiPosition: string;
  progress: number;
  updatedAt: Date;

  constructor(data: MyBookProgressModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectMyBookProgress): MyBookProgressModel {
    return new MyBookProgressModel({
      currentCfiPosition: data.currentCfiPosition,
      progress: data.progress,
      updatedAt: data.updatedAt,
    });
  }
}
