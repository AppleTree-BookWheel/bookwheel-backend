import { Body, Controller, Patch, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { GetBookOverviewResponseDto } from './dto/response/get-book-overview-response.dto';
import { GetBookResponseDto } from './dto/response/get-book-response.dto';
import { GetBookOverviewDto } from './dto/request/get-book-overview.dto';
import { GetBookDto } from './dto/request/get-book.dto';
import { GetSearchBookDto } from './dto/request/get-search-book.dto';
import { UpdateMyBookDto } from './dto/request/update-my-book.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('overview')
  async getBookOverviewsByIdx(
    @Body() getBookOverviewDto: GetBookOverviewDto,
  ): Promise<GetBookOverviewResponseDto[]> {
    return this.bookService.getBookOverviewsByIdx(getBookOverviewDto.idx);
  }

  @Post()
  async getBooksByIdx(
    @Body() getBookDto: GetBookDto,
  ): Promise<GetBookResponseDto[]> {
    return this.bookService.getBooksByIdx(getBookDto.idx);
  }

  @Post('search')
  async getBooksByKeyword(
    @Body() getSearchBookDto: GetSearchBookDto,
  ): Promise<GetBookResponseDto[]> {
    return this.bookService.getBooksByKeyword(getSearchBookDto.keyword);
  }

  @Patch('/my-progress')
  async updateMyBookProgressByUserAndBookIdx(
    @User() user,
    @Body() dto: UpdateMyBookDto,
  ): Promise<void> {
    return this.bookService.updateMyBookProgressByUserAndBookIdx(user.idx, dto);
  }
}
