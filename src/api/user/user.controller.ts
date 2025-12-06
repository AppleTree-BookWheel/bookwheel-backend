import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserResponseDto } from './dto/response/get-user-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UpdatePasswordDto } from './dto/request/update-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { GetPublicUserResponseDto } from './dto/response/get-public-user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 로그인, id 중복 검사시 사용
  @Post('id')
  async getUserById(
    @Body('id') id: string,
  ): Promise<GetUserResponseDto | null> {
    return this.userService.getUserById(id);
  }

  // id로 친구 검색시 사용
  @Post('search')
  @UseGuards(JwtAuthGuard)
  async getPublicUserById(
    @Body('id') id: string,
  ): Promise<GetPublicUserResponseDto | null> {
    return this.userService.getPublicUserById(id);
  }

  @Post('my-info')
  @UseGuards(JwtAuthGuard)
  async getMyInfo(@User() user): Promise<GetUserResponseDto> {
    return this.userService.getUserByIdx(user.idx);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateMyInfo(
    @User() user,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUserByIdx(user.idx, updateUserDto);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  async updateMyPassword(
    @User() user,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    return this.userService.updatePasswordByIdx(user.idx, updatePasswordDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteUserByIdx(@User() user): Promise<void> {
    return this.userService.deleteUserByIdx(user.idx);
  }
}
