export class GetBookReviewResponseDto {
  idx: number;
  bookIdx: number;
  userIdx: number;
  content: string | null;
  rating: number;
  createdAt: Date;
}
