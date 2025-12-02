import { Injectable } from '@nestjs/common';
import { HighlightModel } from './model/highlight.model';
import { BookHighlightRepository } from './book-highlight.repository';

@Injectable()
export class BookHighlightService {
  constructor(
    private readonly bookHighlightRepository: BookHighlightRepository,
  ) {}

  public async getHighlightListByPartyIdx(
    partyIdx: number,
  ): Promise<HighlightModel[]> {
    return await this.bookHighlightRepository.selectHighlightListByPartyIdx(
      partyIdx,
    );
  }
}
