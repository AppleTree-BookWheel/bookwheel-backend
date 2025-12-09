import { GetBookOverviewResponseDto } from 'src/api/book/dto/response/get-book-overview-response.dto';

export class GetHomeRecommendResponseDto {
  top1: GetBookOverviewResponseDto | null;
  top10: {
    bookList: GetBookOverviewResponseDto[];
    userName: string | null;
  };
  recentTop10:
    | {
        bookList: GetBookOverviewResponseDto[];
        bookName: string | null;
      }[]
    | null;
  popularTop10: GetBookOverviewResponseDto[];
  genreSectionList: {
    genre: string;
    bookList: GetBookOverviewResponseDto[];
  }[];
}
