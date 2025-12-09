import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  /**
   * 메시지 내용
   *
   * @example "쪽지 남깁니다."
   */
  @IsNotEmpty()
  @IsString()
  content: string;

  /**
   * 수신자 유저 idx
   *
   * @example 2
   */
  @IsNotEmpty()
  @IsInt()
  receiverIdx: number;
}
