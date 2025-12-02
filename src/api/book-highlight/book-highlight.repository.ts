import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
  SELECT_BOOK_HIGHLIGHT,
  SelectBookHighlight,
} from './model/prisma-type/select-book-highlight';

@Injectable()
export class BookHighlightRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async selectHighlightListByPartyIdx(
    partyIdx: number,
  ): Promise<SelectBookHighlight[]> {
    return await this.txHost.tx.bookHighlight.findMany({
      ...SELECT_BOOK_HIGHLIGHT,
      where: {
        partyIdx,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
