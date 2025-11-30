export class GetBookOverviewResponseDto {
  idx: number;
  title: string;
  author: string;
  coverImagePath: string;
  averageRating: number;
  ratingsCount: number;

  koreanTitle?: string | null;
  koreanAuthor?: string | null;
  koreanCoverPath?: string | null;
}
