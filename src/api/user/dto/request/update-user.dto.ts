import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { GenderType } from 'src/user/constants/gender-type.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public nickname?: string;

  @IsOptional()
  @IsString()
  public profileImagePath?: string;

  @IsOptional()
  @IsInt()
  public age?: number;

  @IsOptional()
  @IsEnum(GenderType)
  public gender?: GenderType;
}
