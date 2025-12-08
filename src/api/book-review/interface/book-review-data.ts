import { SelectBookReview } from '../model/prisma-type/select-book-review';

export interface BookReviewData extends SelectBookReview {
  rating: number;
}
