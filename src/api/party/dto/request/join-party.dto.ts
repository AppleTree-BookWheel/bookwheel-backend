import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JoinPartyDto {
  @IsNotEmpty()
  @IsInt()
  partyIdx: number;

  @IsOptional()
  @IsString()
  password?: string;
}
