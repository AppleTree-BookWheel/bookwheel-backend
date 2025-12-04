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
import { getMyHighlightInput } from './inputs/get-my-highlight.input';

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
    input: getMyHighlightInput,
  ): Promise<SelectMyHighlight[] | null> {
    const { partyIdx, userIdx } = input;
    return await this.txHost.tx.bookHighlight.findMany({
      ...SELECT_MY_HIGHLIGHT,
      where: {
        partyIdx,
        userIdx,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
