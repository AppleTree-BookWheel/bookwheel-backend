import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreateBookReviewInput } from './inputs/create-book-review.input';
import { SELECT_BOOK_RATING } from './model/prisma-type/select-book-rating';
import { SELECT_BOOK_REVIEW } from './model/prisma-type/select-book-review';
import { BookReviewModel } from './model/book-review.model';

@Injectable()
export class BookReviewRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async insertBookReview(
    userIdx: number,
    input: CreateBookReviewInput,
  ): Promise<void> {
    await this.txHost.tx.bookRating.create({
      ...SELECT_BOOK_RATING,
      data: {
        userIdx: userIdx,
        bookIdx: input.bookIdx,
        rating: input.rating,
      },
    });

    await this.txHost.tx.bookReview.create({
      ...SELECT_BOOK_REVIEW,
      data: {
        userIdx: userIdx,
        bookIdx: input.bookIdx,
        content: input.content,
      },
    });
  }

  public async selectBookReviewByUserAndBookIdx(
    userIdx: number,
    bookIdx: number,
  ): Promise<BookReviewModel | null> {
    const review = await this.txHost.tx.bookReview.findFirst({
      ...SELECT_BOOK_REVIEW,
      where: {
        userIdx: userIdx,
        bookIdx: bookIdx,
      },
    });

    const rating = await this.txHost.tx.bookRating.findFirst({
      ...SELECT_BOOK_RATING,
      where: {
        userIdx: userIdx,
        bookIdx: bookIdx,
      },
    });

    if (!review || !rating) {
      return null;
    }

    return {
      idx: review.idx,
      bookIdx: review.bookIdx,
      userIdx: review.userIdx,
      content: review.content,
      rating: rating.rating,
      createdAt: review.createdAt,
    };
  }
}
