import { BookOverviewModel } from 'src/api/book/model/book-overview.model';
import { HomeResponseInterface } from '../interface/home-response.interface';

export class HomeRecommendModel {
  top1: BookOverviewModel | null;
  top10: {
    bookList: BookOverviewModel[];
    userName: string | null;
  };
  recentTop10:
    | {
        bookList: BookOverviewModel[];
        bookName: string | null;
      }[]
    | null;

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
    userName: string | null,
  ) {
    return new HomeRecommendModel({
      top1:
        data.top1?.bookIdx != null
          ? (bookMap.get(data.top1.bookIdx) ?? null)
          : null,
      top10: {
        bookList: data.top10.map((i) => bookMap.get(i.bookIdx)!),
        userName,
      },
      recentTop10: Array.isArray(data.recentTop10)
        ? data.recentTop10.map((section) => ({
            bookName: bookMap.get(section.bookIdx)?.title ?? null,
            bookList: section.bookList.map((b) => bookMap.get(b.bookIdx)!),
          }))
        : null,
      popularTop10: data.popularTop10.map((b) => bookMap.get(b.bookIdx)!),
      genreSectionList: data.genreSectionList.map((section) => ({
        genre: section.genre,
        bookList: section.bookList.map((b) => bookMap.get(b.bookIdx)!),
      })),
    });
  }
}
