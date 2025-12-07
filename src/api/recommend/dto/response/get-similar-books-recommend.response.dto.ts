import { GetBookOverviewDto } from 'src/api/book/dto/request/get-book-overview.dto';

export class GetSimilarBooksRecommendResponseDto {
  bookList: GetBookOverviewDto[];
}
