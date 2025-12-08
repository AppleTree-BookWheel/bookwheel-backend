import { BookReviewData } from '../interface/book-review-data';

export class BookReviewModel {
  idx: number;
  bookIdx: number;
  userIdx: number;
  content: string | null;
  rating: number;
  createdAt: Date;

  constructor(data: BookReviewModel) {
    Object.assign(this, data);
  }

  static fromData(data: BookReviewData): BookReviewModel {
    return new BookReviewModel({
      idx: data.idx,
      bookIdx: data.bookIdx,
      userIdx: data.userIdx,
      content: data.content,
      rating: data.rating,
      createdAt: data.createdAt,
    });
  }
}
