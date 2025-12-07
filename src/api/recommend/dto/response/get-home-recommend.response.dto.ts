import { GetBookOverviewResponseDto } from 'src/api/book/dto/response/get-book-overview-response.dto';

export class GetHomeRecommendResponseDto {
  top1: GetBookOverviewResponseDto | null;
  top10: GetBookOverviewResponseDto[];
  recentTop10: GetBookOverviewResponseDto[];
  popularTop10: GetBookOverviewResponseDto[];
  genreSectionList: {
    genre: string;
    bookList: GetBookOverviewResponseDto[];
  }[];
}
