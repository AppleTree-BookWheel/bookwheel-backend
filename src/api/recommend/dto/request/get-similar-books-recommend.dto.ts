import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class GetSimilarBooksRecommendDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  idx: number;
}
