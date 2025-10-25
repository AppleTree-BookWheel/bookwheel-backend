import { UserType } from '../constants/user-type.enum';

export class CreateUserInput {
  id: string;
  password: string;
  email: string;
  nickname?: string;
  profileImagePath?: string;
  age?: number;
  type: UserType;
}
