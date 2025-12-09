export class GetMessageResponseDto {
  /**
   * 메시지 idx
   *
   * @example 1
   */
  idx: number;

  /**
   * 발신자 유저 idx
   *
   * @example 1
   */
  senderIdx: number;

  /**
   * 수신자 유저 idx
   *
   * @example 2
   */
  receiverIdx: number;

  /**
   * 메시지 내용
   *
   * @example "쪽지 남깁니다."
   */
  content: string;

  /**
   * 읽음 여부
   *
   * @example false
   */
  isRead: boolean;

  /**
   * 전송 일시
   *
   * @example "2024-06-01T12:00:00.000Z"
   */
  sentAt: Date;

  senderNickname: string;
  senderProfileImagePath: string | null;

  receiverNickname: string;
  receiverProfileImagePath: string | null;
}
