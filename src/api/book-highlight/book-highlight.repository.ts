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

@Injectable()
export class BookHighlightRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

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

  public async deleteHighlightByIdx(idx: number): Promise<void> {
    await this.txHost.tx.bookHighlight.update({
      ...SELECT_HIGHLIGHT,
      where: {
        idx: idx,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
