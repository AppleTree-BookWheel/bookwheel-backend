import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { SELECT_USER, SelectUser } from './model/prisma-type/select-user';

@Injectable()
export class UserRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async selectUserById(id: string): Promise<SelectUser | null> {
    return await this.txHost.tx.user.findFirst({
      ...SELECT_USER,
      where: {
        basicAuths: {
          is: {
            id: id,
          },
        },
      },
    });
  }

  public async selectUserByIdx(idx: number): Promise<SelectUser | null> {
    return this.txHost.tx.user.findUnique({
      ...SELECT_USER,
      where: { idx },
    });
  }

  public async selectUserBySnsId(snsId: string): Promise<SelectUser | null> {
    return this.txHost.tx.user.findFirst({
      ...SELECT_USER,
      where: {
        socialAuths: {
          is: {
            snsId: snsId,
          },
        },
      },
    });
  }
}
