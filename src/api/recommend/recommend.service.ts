import { Injectable } from '@nestjs/common';
import { RecommendRepository } from './recommend.repository';
import { BookService } from '../book/book.service';
import { BookOverviewModel } from '../book/model/book-overview.model';
import { UserService } from '../user/user.service';
import { PublicUserModel } from '../user/model/public-user.model';
import { HomeRecommendModel } from './model/home-recommend.model';

@Injectable()
export class RecommendService {
  constructor(
    private readonly recommendRepository: RecommendRepository,
    private readonly bookService: BookService,
    private readonly userService: UserService,
  ) {}

  async getHomeRecommend(userIdx: number): Promise<HomeRecommendModel> {
    const pyData = await this.recommendRepository.getHomeRecommend(userIdx);

    const bookIdxList = new Set<number>();

    if (pyData.top1) bookIdxList.add(pyData.top1.bookIdx);

    pyData.top10?.forEach((item) => bookIdxList.add(item.bookIdx));
    pyData.recentTop10?.forEach((item) => bookIdxList.add(item.bookIdx));
    pyData.popularTop10?.forEach((item) => bookIdxList.add(item.bookIdx));
    pyData.genreSectionList?.forEach((section) =>
      section.bookList.forEach((item) => bookIdxList.add(item.bookIdx)),
    );

    const bookList = await this.bookService.getBookOverviewsByIdx([
      ...bookIdxList,
    ]);
    const bookMap = new Map<number, BookOverviewModel>();

    bookList.forEach((book) => {
      bookMap.set(book.idx, new BookOverviewModel(book));
    });

    return HomeRecommendModel.fromRaw(pyData, bookMap);
  }

  async getSimilarBooksRecommend(
    bookIdx: number,
  ): Promise<BookOverviewModel[]> {
    const pyData =
      await this.recommendRepository.getSimilarBooksRecommend(bookIdx);

    const bookIdxList = pyData.bookList?.map((b) => b.bookIdx) || [];
    if (bookIdxList.length === 0) return [];

    const bookList = await this.bookService.getBookOverviewsByIdx(bookIdxList);

    return bookList.map((book) => new BookOverviewModel(book));
  }

  async getSimilarUsersRecommend(userIdx: number): Promise<PublicUserModel[]> {
    const pyData =
      await this.recommendRepository.getSimilarUsersRecommend(userIdx);

    const userIdxList = pyData.userList ?? [];
    if (userIdxList.length === 0) return [];

    const userList = await this.userService.getUsersByIdxList(userIdxList);

    return userList.map((user) => new PublicUserModel(user));
  }
}
