import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePartyBookProgressDto {
  @IsInt()
  @IsNotEmpty()
  partyIdx: number;

  @IsNumber()
  @IsNotEmpty()
  progress: number;

  @IsString()
  @IsNotEmpty()
  currentCfiPosition: string;
}
