import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
  SELECT_HIGHLIGHT,
  SelectHighlight,
} from './model/prisma-type/select-highlight';

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
    partyIdx: number,
    userIdx: number,
  ): Promise<SelectHighlight[]> {
    return await this.txHost.tx.bookHighlight.findMany({
      ...SELECT_HIGHLIGHT,
      where: {
        partyIdx,
        userIdx,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
