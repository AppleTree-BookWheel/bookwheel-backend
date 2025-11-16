import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GenderType } from 'src/user/constants/gender-type.enum';
import { UserType } from 'src/user/constants/user-type.enum';
import { UserBasicDto } from './user-basic.dto';

export class CreateUserDto {
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

  @IsNotEmpty()
  @IsEnum(UserType)
  public type: UserType;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserBasicDto)
  public basicAuths: UserBasicDto;
}
