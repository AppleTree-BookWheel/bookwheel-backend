import { BookOverviewModel } from 'src/api/book/model/book-overview.model';

export class GenreSectionModel {
  genre: string;
  bookList: BookOverviewModel[];

  constructor(data: GenreSectionModel) {
    Object.assign(this, data);
  }
}
