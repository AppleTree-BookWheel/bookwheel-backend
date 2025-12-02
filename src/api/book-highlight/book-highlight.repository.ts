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

  public async selectHighlightListByPartyIdx(
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

  public async selectHighlightDetailByIdx(idx: number) {}
}
