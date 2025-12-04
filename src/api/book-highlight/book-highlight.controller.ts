import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookHighlightService } from './book-highlight.service';
import { GetBookHighlightResponseDto } from './dto/request/get-book-highlight-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { GetMyHighlightResponseDto } from './dto/response/get-my-highlight-response.dto';
import { CreateHighlightDto } from './dto/request/create-highlight.dto';

@UseGuards(JwtAuthGuard)
@Controller('book-highlight')
export class BookHighlightController {
  constructor(private readonly bookHighlightService: BookHighlightService) {}

  @Get('/all')
  public async getHighlightsByPartyIdx(
    @Body() partyIdx: number,
  ): Promise<GetBookHighlightResponseDto[]> {
    return await this.bookHighlightService.getHighlightsByPartyIdx(partyIdx);
  }

  // 내 하이라이트 모음 페이지를 위한 API
  @Get()
  public async getMyHighlight(
    @User() user,
    @Body('partyIdx') partyIdx: number,
  ): Promise<GetMyHighlightResponseDto[]> {
    return await this.bookHighlightService.getMyHighlights(user.idx, partyIdx);
  }

  @Post()
  public async createHighlight(
    @User() user,
    @Body() dto: CreateHighlightDto,
  ): Promise<void> {
    await this.bookHighlightService.createHighlight(user.idx, dto);
  }
}
