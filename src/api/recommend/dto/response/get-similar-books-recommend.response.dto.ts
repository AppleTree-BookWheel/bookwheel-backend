import { GetBookOverviewResponseDto } from 'src/api/book/dto/response/get-book-overview-response.dto';

export class GetSimilarBooksRecommendResponseDto {
  bookList: GetBookOverviewResponseDto[];
}
