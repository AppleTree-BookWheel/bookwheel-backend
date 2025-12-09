import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { User } from 'src/common/decorators/user.decorator';
import { GetHomeRecommendResponseDto } from './dto/response/get-home-recommend.response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetSimilarUsersRecommendResponseDto } from './dto/response/get-similar-users-recommend.response.dto';
import { GetSimilarBooksRecommendResponseDto } from './dto/response/get-similar-books-recommend.response.dto';

@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Get('home')
  @UseGuards(JwtAuthGuard)
  async getHomeRecommend(@User() user): Promise<GetHomeRecommendResponseDto> {
    return this.recommendService.getHomeRecommend(user.idx);
  }

  @Post('books/:idx')
  async getSimilarBooksRecommend(
    @Param('idx', ParseIntPipe) idx: number,
  ): Promise<GetSimilarBooksRecommendResponseDto> {
    const bookList = await this.recommendService.getSimilarBooksRecommend(idx);
    return { bookList };
  }

  @Get('user/:idx')
  async getSimilarUsersRecommend(
    @User() user,
  ): Promise<GetSimilarUsersRecommendResponseDto> {
    const userList = await this.recommendService.getSimilarUsersRecommend(
      user.idx,
    );
    return { userList };
  }
}
