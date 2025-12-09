import { SelectMessage } from './prisma-type/select-message';

export class MessageModel {
  idx: number;
  senderIdx: number;
  receiverIdx: number;
  content: string;
  isRead: boolean;
  sentAt: Date;

  senderNickname: string;
  senderProfileImagePath: string | null;

  receiverNickname: string;
  receiverProfileImagePath: string | null;

  constructor(data: MessageModel) {
    Object.assign(this, data);
  }

  static fromPrisma(data: SelectMessage): MessageModel {
    return new MessageModel({
      idx: data.idx,
      senderIdx: data.senderIdx,
      receiverIdx: data.receiverIdx,
      content: data.content,
      isRead: data.isRead ?? false, // null일 경우 false 처리
      sentAt: data.sentAt,

      // 보낸 사람 정보 매핑
      senderNickname: data.sender.nickname,
      senderProfileImagePath: data.sender.profileImagePath,

      // 받는 사람 정보 매핑
      receiverNickname: data.receiver.nickname,
      receiverProfileImagePath: data.receiver.profileImagePath,
    });
  }
}
