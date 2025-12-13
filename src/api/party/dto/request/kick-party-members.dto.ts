import { IsArray, IsInt, IsNotEmpty } from 'class-validator';

export class KickPartyMembersDto {
  @IsNotEmpty()
  @IsInt()
  partyIdx: number;

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  memberUserIdxs: number[];
}
