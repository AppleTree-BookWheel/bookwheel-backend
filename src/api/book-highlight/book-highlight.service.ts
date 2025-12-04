import { Injectable } from '@nestjs/common';
import { HighlightModel } from './model/highlight.model';
import { BookHighlightRepository } from './book-highlight.repository';
import { MyHighlightModel } from './model/my-highlight.model';
import { CreateHighlightInput } from './inputs/create-highlight.input';

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
    userIdx: number,
    partyIdx: number,
  ): Promise<MyHighlightModel[]> {
    const response =
      await this.bookHighlightRepository.selectHighlightsByPartyAndUserIdx(
        userIdx,
        partyIdx,
      );
    return response.map((data) => MyHighlightModel.fromPrisma(data));
  }

  public async createHighlight(
    userIdx: number,
    input: CreateHighlightInput,
  ): Promise<void> {
    await this.bookHighlightRepository.insertHighlight(userIdx, input);
  }
}
