import { GetBookOverviewDto } from 'src/api/book/dto/request/get-book-overview.dto';
import { GenreSectionDto } from './genre-section.dto';

export class GetHomeRecommendResponseDto {
  personal_top1?: GetBookOverviewDto;
  personal_top10?: GetBookOverviewDto[];

  initial_top1?: GetBookOverviewDto;
  initial_top10?: GetBookOverviewDto[];
  recent_top10?: GetBookOverviewDto[];

  popular_top10: GetBookOverviewDto[];

  genre_section_list: GenreSectionDto[];
}
