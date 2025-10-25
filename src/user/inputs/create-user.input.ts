import { UserType } from '../constants/user-type.enum';

export class CreateUserInput {
  nickname?: string;
  profileImagePath?: string;
  age?: number;
  type: UserType;
  basicAuths: {
    id: string;
    password: string;
    email: string;
  };
}
