import { SelectBook } from './prisma-type/select-book';

/**
 * 책 상세 페이지 또는 뷰어 접속 시 사용되는 모든 정보를 포함하는 모델입니다.
 */
export class BookModel {
  idx: number;
  title: string;
  author: string;
  coverImagePath: string;
  averageRating: number;
  ratingsCount: number;
  createdAt: Date;

  koreanTitle?: string | null;
  koreanAuthor?: string | null;
  koreanCoverPath?: string | null;
  languageCode?: string | null;
  isbn13?: string | null;

  publisher?: string | null;
  publicationYear?: number | null;
  description?: string | null;

  bookFilePath: string;

  constructor(data: BookModel) {
    Object.assign(this, data);
  }

  /**
   * Prisma의 SelectBookDetail 반환값을 BookModel로 변환합니다.
   */
  static fromPrisma(data: SelectBook | null): BookModel | null {
    if (!data) {
      return null;
    }

    return new BookModel({
      idx: data.idx,
      title: data.title,
      author: data.author,
      coverImagePath: data.coverImagePath,
      averageRating: data.averageRating,
      ratingsCount: data.ratingsCount,
      createdAt: data.createdAt,

      koreanTitle: data.koreanTitle,
      koreanAuthor: data.koreanAuthor,
      koreanCoverPath: data.koreanCoverPath,
      languageCode: data.languageCode,
      isbn13: data.isbn13,

      publisher: data.publisher,
      publicationYear: data.publicationYear,
      description: data.description,

      bookFilePath: data.bookFilePath,
    });
  }
}
