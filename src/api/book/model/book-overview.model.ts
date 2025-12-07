import { SelectBookOverview } from './prisma-type/select-book-overview';

/**
 * 책의 간략한 개요 정보를 포함하는 모델입니다.
 */
export class BookOverviewModel {
  idx: number;
  title: string;
  author: string;
  coverImagePath: string;
  averageRating: number;
  ratingsCount: number;

  constructor(data: BookOverviewModel) {
    Object.assign(this, data);
  }

  /**
   * Prisma의 SelectBookOverview 반환값을 BookOverviewModel로 변환합니다.
   */
  static fromPrisma(data: SelectBookOverview): BookOverviewModel {
    return new BookOverviewModel({
      idx: data.idx,
      title: data.title,
      author: data.author,
      coverImagePath: data.coverImagePath,
      averageRating: data.averageRating,
      ratingsCount: data.ratingsCount,
    });
  }
}
