import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
  SELECT_BOOK_OVERVIEW,
  SelectBookOverview,
} from './model/prisma-type/select-book-overview';
import { SELECT_BOOK, SelectBook } from './model/prisma-type/select-book';

@Injectable()
export class BookRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  async selectBookOverviewsByIdx(
    idx: number[],
  ): Promise<SelectBookOverview[] | null> {
    if (idx.length === 0) {
      return [];
    }

    return await this.txHost.tx.book.findMany({
      ...SELECT_BOOK_OVERVIEW,
      where: {
        idx: {
          in: idx,
        },
        deletedAt: null,
      },
    });
  }

  async selectBooksByIdx(idx: number[]): Promise<SelectBook[] | null> {
    if (idx.length === 0) {
      return [];
    }

    return await this.txHost.tx.book.findMany({
      ...SELECT_BOOK,
      where: {
        idx: {
          in: idx,
        },
        deletedAt: null,
      },
    });
  }

  async selectBooksByKeyword(keyword: string): Promise<SelectBook[] | null> {
    return await this.txHost.tx.book.findMany({
      ...SELECT_BOOK,
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { author: { contains: keyword, mode: 'insensitive' } },
        ],
        deletedAt: null,
      },
      orderBy: { title: 'desc' },
      take: 10,
    });
  }
}
