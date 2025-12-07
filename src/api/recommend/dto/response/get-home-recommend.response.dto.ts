import { GetBookOverviewDto } from 'src/api/book/dto/request/get-book-overview.dto';
import { GenreSectionDto } from './genre-section.dto';

export class GetHomeRecommendResponseDto {
  top1: GetBookOverviewDto;
  top10: GetBookOverviewDto[];
  recentTop10: GetBookOverviewDto[];
  popularTop10: GetBookOverviewDto[];
  genreSectionList: GenreSectionDto[];
}
