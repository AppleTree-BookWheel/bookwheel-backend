import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { BookOverviewModel } from './model/book-overview.model';
import { BookModel } from './model/book.model';

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
}
