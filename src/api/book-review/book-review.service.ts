import { BadRequestException, Injectable } from '@nestjs/common';
import { BookReviewRepository } from './book-review.repository';
import { CreateBookReviewInput } from './inputs/create-book-review.input';
import { BookReviewModel } from './model/book-review.model';

@Injectable()
export class BookReviewService {
  constructor(private readonly bookReviewRepository: BookReviewRepository) {}

  public async createBookReview(
    userIdx: number,
    input: CreateBookReviewInput,
  ): Promise<void> {
    if (input.rating < 0 || input.rating > 5) {
      throw new BadRequestException('Rating must be between 0 and 5.');
    }

    return this.bookReviewRepository.insertBookReview(userIdx, input);
  }

  public async getBookReviewByUserAndBookIdx(
    userIdx: number,
    bookIdx: number,
  ): Promise<BookReviewModel | null> {
    return this.bookReviewRepository.selectBookReviewByUserAndBookIdx(
      userIdx,
      bookIdx,
    );
  }
}
