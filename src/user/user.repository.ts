import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { SELECT_USER, SelectUser } from './model/prisma-type/select-user';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';
import { CreateSurveyResponseInput } from './inputs/create-survey-response.input';
import { UpdateSurveyResponseInput } from './inputs/update-survey-response.input';

@Injectable()
export class UserRepository {
  constructor(
    private readonly txHost: TransactionHost<TransactionalAdapterPrisma>,
  ) {}

  public async selectUserById(id: string): Promise<SelectUser | null> {
    return await this.txHost.tx.user.findFirst({
      ...SELECT_USER,
      where: {
        deletedAt: null,
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
      where: { idx, deletedAt: null },
    });
  }

  public async selectUserBySnsId(snsId: string): Promise<SelectUser | null> {
    return this.txHost.tx.user.findFirst({
      ...SELECT_USER,
      where: {
        deletedAt: null,
        socialAuths: {
          is: {
            snsId: snsId,
          },
        },
      },
    });
  }

  public async insertUser(input: CreateUserInput): Promise<SelectUser> {
    return await this.txHost.tx.user.create({
      ...SELECT_USER,
      data: {
        nickname: input.nickname,
        profileImagePath: input.profileImagePath,
        age: input.age,
        gender: input.gender,
        type: input.type,
        basicAuths: {
          create: {
            id: input.basicAuths.id,
            password: input.basicAuths.password,
            email: input.basicAuths.email,
          },
        },
      },
    });
  }

  public async updateUserByIdx(
    idx: number,
    input: UpdateUserInput,
  ): Promise<void> {
    await this.txHost.tx.user.update({
      data: {
        nickname: input.nickname,
        profileImagePath: input.profileImagePath,
      },
      where: { idx, deletedAt: null },
    });
  }

  public async deleteUserByIdx(idx: number): Promise<void> {
    await this.txHost.tx.user.update({
      data: {
        deletedAt: new Date(),
      },
      where: { idx, deletedAt: null },
    });
  }
}
