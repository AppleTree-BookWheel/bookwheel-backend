import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessageInput } from './inputs/create-message.input';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  public async createMessage(
    senderIdx: number,
    input: CreateMessageInput,
  ): Promise<void> {
    await this.messageRepository.insertMessage(senderIdx, input);
  }
}
