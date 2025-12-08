import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BookReviewService } from './book-review.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBookReviewDto } from './dto/request/create-book-review.dto';
import { User } from 'src/common/decorators/user.decorator';
import { GetBookReviewResponseDto } from './dto/response/get-book-review-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('book-review')
export class BookReviewController {
  constructor(private readonly bookReviewService: BookReviewService) {}

  @Post()
  public async createBookReview(
    @User() user,
    @Body() dto: CreateBookReviewDto,
  ): Promise<void> {
    return this.bookReviewService.createBookReview(user.idx, dto);
  }

  @Post('/get')
  public async getBookReviewByUserAndBookIdx(
    @User() user,
    @Body('bookIdx') bookIdx: number,
  ): Promise<GetBookReviewResponseDto | null> {
    return this.bookReviewService.getBookReviewByUserAndBookIdx(
      user.idx,
      bookIdx,
    );
  }
}
