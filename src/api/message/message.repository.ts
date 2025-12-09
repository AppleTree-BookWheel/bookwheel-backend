import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './inputs/create-message.input';
import {
  SELECT_MESSAGE,
  SelectMessage,
} from './model/prisma-type/select-message';

@Injectable()
export class MessageRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async insertMessage(
    senderIdx: number,
    input: CreateMessageInput,
  ): Promise<SelectMessage> {
    return await this.txHost.tx.message.create({
      ...SELECT_MESSAGE,
      data: {
        senderIdx: senderIdx,
        receiverIdx: input.receiverIdx,
        content: input.content,
        isRead: false,
      },
    });
  }
}
