import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { BookOverviewModel } from './model/book-overview.model';
import { BookModel } from './model/book.model';
import { UpdateMyBookProgressInput } from './inputs/update-my-book-progress-input';
import { MyBookProgressModel } from './model/my-book-progress.model';
import { MyBookSortType } from './constants/my-book-sort-type.enum';
import { MyBookModel } from './model/my-book.model';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async getBookOverviewsByIdx(
    idx: number[],
  ): Promise<BookOverviewModel[]> {
    const response = await this.bookRepository.selectBookOverviewsByIdx(idx);

    if (!response || response.length === 0) {
      return [];
    }
    return response.map((response) => BookOverviewModel.fromPrisma(response));
  }

  public async getBooksByIdx(idx: number[]): Promise<BookModel[]> {
    const response = await this.bookRepository.selectBooksByIdx(idx);

    if (!response || response.length === 0) {
      return [];
    }
    return response.map((response) => BookModel.fromPrisma(response));
  }

  public async getBooksByKeyword(keyword: string): Promise<BookModel[]> {
    const response = await this.bookRepository.selectBooksByKeyword(keyword);

    if (!response || response.length === 0) {
      return [];
    }
    return response.map((response) => BookModel.fromPrisma(response));
  }

  public async updateMyBookProgressByUserAndBookIdx(
    userIdx: number,
    input: UpdateMyBookProgressInput,
  ): Promise<void> {
    await this.bookRepository.upsertMyBookProgressByUserAndBookIdx(
      userIdx,
      input,
    );
  }

  public async getMyBookProgressByUserAndBookIdx(
    userIdx: number,
    bookIdx: number,
  ): Promise<MyBookProgressModel | null> {
    const response =
      await this.bookRepository.selectMyBookProgressByUserAndBookIdx(
        userIdx,
        bookIdx,
      );
    if (!response) {
      return null;
    }
    return MyBookProgressModel.fromPrisma(response);
  }

  public async getMyBooksByUserIdx(
    userIdx: number,
    sortType: MyBookSortType,
  ): Promise<MyBookModel[]> {
    const response = await this.bookRepository.selectMyBooksByUserIdx(
      userIdx,
      sortType,
    );

    if (!response || response.length === 0) {
      return [];
    }
    return response.map((data) => MyBookModel.fromPrisma(data));
  }
}
