import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel } from './model/user.model';
import { CreateUserInput } from './inputs/create-user.input';
import { UpdateUserInput } from './inputs/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // id 중복 검사를 위한 메서드
  public async getUserById(id: string): Promise<UserModel | null> {
    const user = await this.userRepository.selectUserById(id);

    if (!user) {
      return null;
    }

    return UserModel.fromPrisma(user);
  }

  public async getUserByIdx(idx: number): Promise<UserModel> {
    const user = await this.userRepository.selectUserByIdx(idx);

    if (!user) {
      throw new Error(`User with idx ${idx} not found`);
    }

    return UserModel.fromPrisma(user);
  }

  public async createUser(input: CreateUserInput): Promise<UserModel> {
    return await this.userRepository
      .insertUser(input)
      .then(UserModel.fromPrisma);
  }

  public async updateUserByIdx(
    idx: number,
    input: UpdateUserInput,
  ): Promise<void> {
    await this.userRepository.updateUserByIdx(idx, input);
  }

  public async deleteUserByIdx(idx: number): Promise<void> {
    await this.userRepository.deleteUserByIdx(idx);
  }
}
