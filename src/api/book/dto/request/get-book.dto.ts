import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class GetBookDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  idx: number[];
}
