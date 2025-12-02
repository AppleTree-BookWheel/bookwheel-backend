import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { BookHighlightService } from './book-highlight.service';
import { GetBookHighlightResponseDto } from './dto/request/get-book-highlight-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('book-highlight')
export class BookHighlightController {
  constructor(private readonly bookHighlightService: BookHighlightService) {}

  @Get('/all')
  public async getHighlightListByPartyIdx(
    @Body() partyIdx: number,
  ): Promise<GetBookHighlightResponseDto[]> {
    return await this.bookHighlightService.getHighlightListByPartyIdx(partyIdx);
  }
}
