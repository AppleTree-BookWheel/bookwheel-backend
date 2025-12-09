import { SelectMyBook } from './prisma-type/select-my-book';

export class MyBookModel {
  bookIdx: number;
  title: string;
  author: string;
  coverImagePath: string;
  progress: number;
  updatedAt: Date;

  constructor(data: MyBookModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectMyBook): MyBookModel {
    return new MyBookModel({
      bookIdx: data.book.idx,
      title: data.book.title,
      author: data.book.author,
      coverImagePath: data.book.coverImagePath,
      progress: data.progress,
      updatedAt: data.updatedAt,
    });
  }
}
