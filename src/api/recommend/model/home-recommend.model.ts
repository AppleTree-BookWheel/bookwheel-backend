import { BookOverviewModel } from 'src/api/book/model/book-overview.model';
import { HomeResponseInterface } from '../interface/home-response.interface';

export class HomeRecommendModel {
  top1: BookOverviewModel | null;
  top10: BookOverviewModel[];
  recentTop10: BookOverviewModel[];
  popularTop10: BookOverviewModel[];
  genreSectionList: {
    genre: string;
    bookList: BookOverviewModel[];
  }[];

  constructor(data: Omit<HomeRecommendModel, 'toDto'>) {
    Object.assign(this, data);
  }

  static fromRaw(
    data: HomeResponseInterface,
    bookMap: Map<number, BookOverviewModel>,
  ) {
    return new HomeRecommendModel({
      top1:
        data.top1?.bookIdx != null
          ? (bookMap.get(data.top1.bookIdx) ?? null)
          : null,

      top10: data.top10.map((b) => bookMap.get(b.bookIdx)!),
      recentTop10: data.recentTop10.map((b) => bookMap.get(b.bookIdx)!),
      popularTop10: data.popularTop10.map((b) => bookMap.get(b.bookIdx)!),

      genreSectionList: data.genreSectionList.map((section) => ({
        genre: section.genre,
        bookList: section.bookList.map((b) => bookMap.get(b.bookIdx)!),
      })),
    });
  }
}
