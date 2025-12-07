import { BookOverviewModel } from 'src/api/book/model/book-overview.model';

export class HomeRecommendModel {
  top1: BookOverviewModel;
  top10: BookOverviewModel[];
  recentTop10: BookOverviewModel[];
  popularTop10: BookOverviewModel[];
  genreSectionList: {
    genre: string;
    bookList: BookOverviewModel[];
  }[];

  constructor(data: HomeRecommendModel) {
    Object.assign(this, data);
  }
}
