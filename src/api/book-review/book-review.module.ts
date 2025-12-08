import { Module } from '@nestjs/common';
import { BookReviewController } from './book-review.controller';
import { BookReviewService } from './book-review.service';
import { BookReviewRepository } from './book-review.repository';

@Module({
  controllers: [BookReviewController],
  providers: [BookReviewService, BookReviewRepository],
})
export class BookReviewModule {}
