import { IsNotEmpty, IsString } from 'class-validator';

export class GetSearchBookDto {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
