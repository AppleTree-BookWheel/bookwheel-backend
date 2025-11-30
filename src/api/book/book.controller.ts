import { Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { GetBookOverviewResponseDto } from './dto/response/get-book-overview-response.dto';
import { GetBookResponseDto } from './dto/response/get-book-response.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('overview')
  async getBookOverviewsByIdx(
    idx: number[],
  ): Promise<GetBookOverviewResponseDto[]> {
    return this.bookService.getBookOverviewsByIdx(idx);
  }

  @Get()
  async getBooksByIdx(idx: number[]): Promise<GetBookResponseDto[]> {
    return this.bookService.getBooksByIdx(idx);
  }
}
