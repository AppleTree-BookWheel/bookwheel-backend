import { Body, Controller, Get } from '@nestjs/common';
import { BookService } from './book.service';
import { GetBookOverviewResponseDto } from './dto/response/get-book-overview-response.dto';
import { GetBookResponseDto } from './dto/response/get-book-response.dto';
import { GetBookOverviewDto } from './dto/request/get-book-overview.dto';
import { GetBookDto } from './dto/request/get-book.dto';
import { GetSearchBookDto } from './dto/request/get-search-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('overview')
  async getBookOverviewsByIdx(
    @Body() getBookOverviewDto: GetBookOverviewDto,
  ): Promise<GetBookOverviewResponseDto[]> {
    return this.bookService.getBookOverviewsByIdx(getBookOverviewDto.idx);
  }

  @Get()
  async getBooksByIdx(
    @Body() getBookDto: GetBookDto,
  ): Promise<GetBookResponseDto[]> {
    return this.bookService.getBooksByIdx(getBookDto.idx);
  }

  @Get('search')
  async getBooksByKeyword(
    @Body() getSearchBookDto: GetSearchBookDto,
  ): Promise<GetBookResponseDto[]> {
    return this.bookService.getBooksByKeyword(getSearchBookDto.keyword);
  }
}
