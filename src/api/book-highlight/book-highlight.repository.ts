import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
  SELECT_HIGHLIGHT,
  SelectHighlight,
} from './model/prisma-type/select-highlight';
import {
  SELECT_MY_HIGHLIGHT,
  SelectMyHighlight,
} from './model/prisma-type/select-my-highlight';
import { CreateHighlightInput } from './inputs/create-highlight.input';
import {
  SELECT_COMMENT,
  SelectComment,
} from './model/prisma-type/select-comment';
import { CreateCommentInput } from './inputs/create-comment.input';
import { UpdateCommentInput } from './inputs/update-comment.input';

@Injectable()
export class BookHighlightRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async selectHighlightByIdx(
    idx: number,
  ): Promise<SelectHighlight | null> {
    return await this.txHost.tx.bookHighlight.findFirst({
      ...SELECT_HIGHLIGHT,
      where: {
        idx,
        deletedAt: null,
      },
    });
  }

  public async selectHighlightsByPartyIdx(
    partyIdx: number,
  ): Promise<SelectHighlight[]> {
    return await this.txHost.tx.bookHighlight.findMany({
      ...SELECT_HIGHLIGHT,
      where: {
        partyIdx,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  public async selectHighlightsByPartyAndUserIdx(
    userIdx: number,
    partyIdx: number,
  ): Promise<SelectMyHighlight[]> {
    return await this.txHost.tx.bookHighlight.findMany({
      ...SELECT_MY_HIGHLIGHT,
      where: {
        userIdx,
        partyIdx,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async insertHighlight(
    userIdx: number,
    input: CreateHighlightInput,
  ): Promise<SelectHighlight> {
    return await this.txHost.tx.bookHighlight.create({
      ...SELECT_HIGHLIGHT,
      data: {
        partyIdx: input.partyIdx,
        bookIdx: input.bookIdx,
        userIdx: userIdx,
        cfiRange: input.cfiRange,
        content: input.content,
        colorCode: input.colorCode,
      },
    });
  }

  public async deleteHighlightByUserAndHighlightIdx(
    userIdx: number,
    highlightIdx: number,
  ): Promise<void> {
    await this.txHost.tx.bookHighlight.updateMany({
      where: {
        idx: highlightIdx,
        userIdx: userIdx,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async selectCommentByIdx(idx: number): Promise<SelectComment | null> {
    return await this.txHost.tx.bookComment.findFirst({
      ...SELECT_COMMENT,
      where: {
        idx,
      },
    });
  }

  public async selectCommentsByHighlightIdx(
    highlightIdx: number,
  ): Promise<SelectComment[]> {
    return await this.txHost.tx.bookComment.findMany({
      ...SELECT_COMMENT,
      where: {
        highlightIdx,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  public async insertComment(
    userIdx: number,
    createCommentInput: CreateCommentInput,
  ): Promise<SelectComment> {
    return await this.txHost.tx.bookComment.create({
      ...SELECT_COMMENT,
      data: {
        highlightIdx: createCommentInput.highlightIdx,
        bookIdx: createCommentInput.bookIdx,
        userIdx: userIdx,
        content: createCommentInput.content,
      },
    });
  }

  public async updateCommentByUserAndCommentIdx(
    userIdx: number,
    input: UpdateCommentInput,
  ): Promise<void> {
    const { commentIdx, content } = input;
    await this.txHost.tx.bookComment.updateMany({
      where: {
        idx: commentIdx,
        userIdx: userIdx,
      },
      data: {
        content: content,
      },
    });
  }
}
