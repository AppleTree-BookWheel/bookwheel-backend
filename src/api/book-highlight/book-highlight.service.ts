import { Injectable } from '@nestjs/common';
import { HighlightModel } from './model/highlight.model';
import { BookHighlightRepository } from './book-highlight.repository';
import { MyHighlightModel } from './model/my-highlight.model';
import { getMyHighlightInput } from './inputs/get-my-highlight.input';

@Injectable()
export class BookHighlightService {
  constructor(
    private readonly bookHighlightRepository: BookHighlightRepository,
  ) {}

  public async getHighlightsByPartyIdx(
    partyIdx: number,
  ): Promise<HighlightModel[]> {
    return await this.bookHighlightRepository.selectHighlightsByPartyIdx(
      partyIdx,
    );
  }

  public async getMyHighlights(
    input: getMyHighlightInput,
  ): Promise<MyHighlightModel[]> {
    const response =
      await this.bookHighlightRepository.selectHighlightsByPartyAndUserIdx(
        input,
      );
    return response.map((data) => MyHighlightModel.fromPrisma(data));
  }
}
