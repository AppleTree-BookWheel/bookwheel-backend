import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class GetBookOverviewDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  idx: number[];
}
