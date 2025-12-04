import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HighlightModel } from './model/highlight.model';
import { BookHighlightRepository } from './book-highlight.repository';
import { MyHighlightModel } from './model/my-highlight.model';
import { CreateHighlightInput } from './inputs/create-highlight.input';
import { CommentModel } from './model/comment.model';
import { CreateCommentInput } from './inputs/create-comment.input';
import { UpdateCommentInput } from './inputs/update-comment.input';

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

  public async deleteHighlightByHighlightAndUserIdx(
    userIdx: number,
    highlightIdx: number,
  ): Promise<void> {
    const highlight =
      await this.bookHighlightRepository.selectHighlightByIdx(highlightIdx);
    if (!highlight) {
      throw new NotFoundException('Highlight not found');
    }

    if (highlight.userIdx !== userIdx) {
      throw new ForbiddenException('Unauthorized to delete this highlight');
    }

    await this.bookHighlightRepository.deleteHighlightByUserAndHighlightIdx(
      userIdx,
      highlightIdx,
    );
  }

  public async getCommentsByHighlightIdx(
    highlightIdx: number,
  ): Promise<CommentModel[]> {
    const response =
      await this.bookHighlightRepository.selectCommentsByHighlightIdx(
        highlightIdx,
      );
    return response.map((data) => CommentModel.fromPrisma(data));
  }

  public async createComment(
    userIdx: number,
    input: CreateCommentInput,
  ): Promise<void> {
    await this.bookHighlightRepository.insertComment(userIdx, input);
  }

  public async updateCommentByUserAndCommentIdx(
    userIdx: number,
    input: UpdateCommentInput,
  ): Promise<void> {
    const response = await this.bookHighlightRepository.selectCommentByIdx(
      input.commentIdx,
    );
    if (!response) {
      throw new NotFoundException('Comment not found');
    }

    if (response.userIdx !== userIdx) {
      throw new ForbiddenException('Unauthorized to update this comment');
    }

    await this.bookHighlightRepository.updateCommentByUserAndCommentIdx(
      userIdx,
      input,
    );
  }
}
