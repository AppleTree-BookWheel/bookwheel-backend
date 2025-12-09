import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import {
  SELECT_BOOK_OVERVIEW,
  SelectBookOverview,
} from './model/prisma-type/select-book-overview';
import { SELECT_BOOK, SelectBook } from './model/prisma-type/select-book';
import { UpdateMyBookProgressInput } from './inputs/update-my-book-progress-input';
import {
  SELECT_MY_BOOK_PROGRESS,
  SelectMyBookProgress,
} from './model/prisma-type/select-my-book-progress';
import { MyBookSortType } from './constants/my-book-sort-type.enum';
import {
  SELECT_MY_BOOK,
  SelectMyBook,
} from './model/prisma-type/select-my-book';
import { Prisma } from '@prisma/client';

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

  public async selectMyBooksByUserIdx(
    userIdx: number,
    sortType: MyBookSortType,
  ): Promise<SelectMyBook[]> {
    const sortMap: Record<
      MyBookSortType,
      Prisma.MyBookProgressOrderByWithRelationInput
    > = {
      [MyBookSortType.TITLE]: { book: { title: 'asc' } },
      [MyBookSortType.AUTHOR]: { book: { author: 'asc' } },
      [MyBookSortType.PUBLICATION]: { book: { publicationYear: 'desc' } },
      [MyBookSortType.RECENTLY_VIEWED]: { updatedAt: 'desc' },
    };

    const orderBy = sortMap[sortType] ?? { updatedAt: 'desc' };
    return await this.txHost.tx.myBookProgress.findMany({
      ...SELECT_MY_BOOK,
      where: {
        userIdx: userIdx,
      },
      orderBy: orderBy,
    });
  }

  public async upsertMyBookProgressByUserAndBookIdx(
    userIdx: number,
    input: UpdateMyBookProgressInput,
  ): Promise<SelectMyBookProgress> {
    return await this.txHost.tx.myBookProgress.upsert({
      ...SELECT_MY_BOOK_PROGRESS,
      where: {
        userIdx_bookIdx: {
          userIdx: userIdx,
          bookIdx: input.bookIdx,
        },
      },
      create: {
        userIdx: userIdx,
        bookIdx: input.bookIdx,
        progress: input.progress,
        currentCfiPosition: input.currentCfiPosition,
      },
      update: {
        progress: input.progress,
        currentCfiPosition: input.currentCfiPosition,
        updatedAt: new Date(),
      },
    });
  }

  public async selectMyBookProgressByUserAndBookIdx(
    userIdx: number,
    bookIdx: number,
  ): Promise<SelectMyBookProgress | null> {
    return await this.txHost.tx.myBookProgress.findUnique({
      ...SELECT_MY_BOOK_PROGRESS,
      where: {
        userIdx_bookIdx: {
          userIdx: userIdx,
          bookIdx: bookIdx,
        },
      },
    });
  }
}
