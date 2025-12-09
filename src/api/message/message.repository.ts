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
        sentAt: new Date(),
      },
    });
  }

  public async selectMessageByReceiverIdx(
    userIdx: number,
  ): Promise<SelectMessage[]> {
    return await this.txHost.tx.message.findMany({
      ...SELECT_MESSAGE,
      where: {
        receiverIdx: userIdx,
        deletedAt: null,
      },
      orderBy: { sentAt: 'desc' },
    });
  }

  public async selectMessageBySenderIdx(
    userIdx: number,
  ): Promise<SelectMessage[]> {
    return await this.txHost.tx.message.findMany({
      ...SELECT_MESSAGE,
      where: {
        senderIdx: userIdx,
        deletedAt: null,
      },
      orderBy: { sentAt: 'desc' },
    });
  }

  public selectMessageByIdx(messageIdx: number): Promise<SelectMessage | null> {
    return this.txHost.tx.message.findFirst({
      ...SELECT_MESSAGE,
      where: {
        idx: messageIdx,
        deletedAt: null,
      },
    });
  }

  public async deleteMessageByUserAndMessageIdx(
    userIdx: number,
    messageIdx: number,
  ): Promise<void> {
    await this.txHost.tx.message.updateMany({
      where: {
        idx: messageIdx,
        OR: [{ senderIdx: userIdx }, { receiverIdx: userIdx }],
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
