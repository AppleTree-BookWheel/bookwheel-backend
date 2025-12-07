import { GetBookOverviewDto } from 'src/api/book/dto/request/get-book-overview.dto';
import { GenreSectionDto } from './genre-section.dto';

export class GetHomeRecommendResponseDto {
  personalTop1?: GetBookOverviewDto;
  personalTop10?: GetBookOverviewDto[];

  initialTop1?: GetBookOverviewDto;
  initialTop10?: GetBookOverviewDto[];
  recentTop10?: GetBookOverviewDto[];
  popularTop10: GetBookOverviewDto[];

  genreSectionList: GenreSectionDto[];
}
