import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { GetBookOverviewResponseDto } from './dto/response/get-book-overview-response.dto';
import { GetBookResponseDto } from './dto/response/get-book-response.dto';
import { GetBookOverviewDto } from './dto/request/get-book-overview.dto';
import { GetBookDto } from './dto/request/get-book.dto';
import { GetSearchBookDto } from './dto/request/get-search-book.dto';
import { UpdateMyBookDto } from './dto/request/update-my-book.dto';
import { User } from 'src/common/decorators/user.decorator';
import { GetMyBookProgressResponseDto } from './dto/response/get-my-book-progress-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MyBookSortType } from './constants/my-book-sort-type.enum';
import { MyBookModel } from './model/my-book.model';

@UseGuards(JwtAuthGuard)
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

  @Post('/my-progress')
  async getMyBookProgressByUserAndBookIdx(
    @User() user,
    @Body('bookIdx') bookIdx: number,
  ): Promise<GetMyBookProgressResponseDto | null> {
    return this.bookService.getMyBookProgressByUserAndBookIdx(
      user.idx,
      bookIdx,
    );
  }

  @Post('/my-books')
  async getMyBooksByUserIdx(
    @User() user,
    @Body('sortType') sortType: MyBookSortType,
  ): Promise<MyBookModel[]> {
    return this.bookService.getMyBooksByUserIdx(user.idx, sortType);
  }
}
