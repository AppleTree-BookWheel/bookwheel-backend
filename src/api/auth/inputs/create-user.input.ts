import { GenderType } from 'src/api/user/constants/gender-type.enum';
import { UserType } from 'src/api/user/constants/user-type.enum';

export class CreateUserInput {
  nickname?: string;
  profileImagePath?: string;
  age?: number;
  gender?: GenderType;
  type: UserType;
  basicAuths: {
    id: string;
    password: string;
    email: string;
  };
}
