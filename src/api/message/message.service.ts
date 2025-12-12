import { ForbiddenException, Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessageInput } from './inputs/create-message.input';
import { MessageModel } from './model/message.model';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  public async createMessage(
    senderIdx: number,
    input: CreateMessageInput,
  ): Promise<void> {
    await this.messageRepository.insertMessage(senderIdx, input);
  }

  public async getMessageByUserAndMessageIdx(
    userIdx: number,
    messageIdx: number,
  ): Promise<MessageModel | null> {
    const message = await this.messageRepository.selectMessageIdx(
      userIdx,
      messageIdx,
    );

    if (!message) {
      return null;
    }

    if (message.senderIdx !== userIdx && message.receiverIdx !== userIdx) {
      throw new ForbiddenException(
        'You do not have permission to view this message.',
      );
    }

    return MessageModel.fromPrisma(message);
  }

  public async getReceivedMessages(userIdx: number): Promise<MessageModel[]> {
    return await this.messageRepository
      .selectMessageByReceiverIdx(userIdx)
      .then((messages) =>
        messages.map((message) => MessageModel.fromPrisma(message)),
      );
  }

  public async getSentMessages(userIdx: number): Promise<MessageModel[]> {
    return await this.messageRepository
      .selectMessageBySenderIdx(userIdx)
      .then((messages) =>
        messages.map((message) => MessageModel.fromPrisma(message)),
      );
  }

  public async deleteMessageByUserAndMessageIdx(
    userIdx: number,
    messageIdx: number,
  ): Promise<void> {
    await this.messageRepository.deleteMessageByUserAndMessageIdx(
      userIdx,
      messageIdx,
    );
  }
}
