import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserResponseDto } from './dto/response/get-user-response.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UpdatePasswordDto } from './dto/request/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id/:id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<GetUserResponseDto | null> {
    return this.userService.getUserById(id);
  }

  @Get('/:idx')
  async getUserByIdx(
    @Param('idx', ParseIntPipe) idx: number,
  ): Promise<GetUserResponseDto> {
    return this.userService.getUserByIdx(idx);
  }

  @Patch('/:idx')
  async updateUserByIdx(
    @Param('idx', ParseIntPipe) idx: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUserByIdx(idx, updateUserDto);
  }

  @Patch('/:idx/password')
  async updatePasswordByIdx(
    @Param('idx', ParseIntPipe) idx: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    return this.userService.updatePasswordByIdx(idx, updatePasswordDto);
  }

  @Delete('/:idx')
  async deleteUserByIdx(
    @Param('idx', ParseIntPipe) idx: number,
  ): Promise<void> {
    return this.userService.deleteUserByIdx(idx);
  }
}
