import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // id 중복 검사를 위한 메서드
  public async getUserById(id: string) {
    return this.userRepository.selectUserById(id);
  }

  public async getUserByIdx(idx: number): Promise<UserModel> {
    const user = await this.userRepository.selectUserByIdx(idx);

    if (!user) {
      throw new Error(`User with idx ${idx} not found`);
    }

    return user && UserModel.fromPrisma(user);
  }
}
