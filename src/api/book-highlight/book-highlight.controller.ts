import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookHighlightService } from './book-highlight.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { GetMyHighlightResponseDto } from './dto/response/get-my-highlight-response.dto';
import { CreateHighlightDto } from './dto/request/create-highlight.dto';
import { GetCommentResponseDto } from './dto/response/get-comment-response.dto';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { UpdateCommentDto } from './dto/request/update-comment.dto';
import { GetBookHighlightResponseDto } from './dto/response/get-book-highlight-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('book-highlight')
export class BookHighlightController {
  constructor(private readonly bookHighlightService: BookHighlightService) {}

  @Post('/all')
  public async getHighlightsByPartyIdx(
    @Body('partyIdx', ParseIntPipe) partyIdx: number,
  ): Promise<GetBookHighlightResponseDto[]> {
    return await this.bookHighlightService.getHighlightsByPartyIdx(partyIdx);
  }

  // 내 하이라이트 모음 페이지를 위한 API
  @Post('/my')
  public async getMyHighlight(
    @User() user,
    @Body('partyIdx', ParseIntPipe) partyIdx: number,
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

  @Delete('/:highlightIdx')
  public async deleteHighlightByHighlightAndUserIdx(
    @User() user,
    @Param('highlightIdx', ParseIntPipe) highlightIdx: number,
  ): Promise<void> {
    await this.bookHighlightService.deleteHighlightByHighlightAndUserIdx(
      user.idx,
      highlightIdx,
    );
  }

  @Post('/comments/list')
  public async getCommentsByHighlightIdx(
    @Body('highlightIdx', ParseIntPipe) highlightIdx: number,
  ): Promise<GetCommentResponseDto[]> {
    return await this.bookHighlightService.getCommentsByHighlightIdx(
      highlightIdx,
    );
  }

  @Post('/comments')
  public async createComment(
    @User() user,
    @Body() dto: CreateCommentDto,
  ): Promise<void> {
    await this.bookHighlightService.createComment(user.idx, dto);
  }

  @Patch('/comments')
  public async updateCommentByUserAndCommentIdx(
    @User() user,
    @Body() dto: UpdateCommentDto,
  ): Promise<void> {
    await this.bookHighlightService.updateCommentByUserAndCommentIdx(
      user.idx,
      dto,
    );
  }

  @Delete('/comments/:commentIdx')
  public async deleteCommentByUserAndCommentIdx(
    @User() user,
    @Param('commentIdx', ParseIntPipe) commentIdx: number,
  ): Promise<void> {
    await this.bookHighlightService.deleteCommentByUserAndCommentIdx(
      user.idx,
      commentIdx,
    );
  }
}
