import { Injectable } from '@nestjs/common';
import { BookHighlightModel } from './model/book-highlight.model';
import { BookHighlightRepository } from './book-highlight.repository';

@Injectable()
export class BookHighlightService {
  constructor(
    private readonly bookHighlightRepository: BookHighlightRepository,
  ) {}

  public async getHighlightListByPartyIdx(
    partyIdx: number,
  ): Promise<BookHighlightModel[]> {
    return await this.bookHighlightRepository.selectHighlightListByPartyIdx(
      partyIdx,
    );
  }
}
