import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';
import { GetUserResponseDto } from './dto/response/get-user-response.dto';

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

  @Post()
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:idx')
  async updateUserByIdx(
    @Param('idx', ParseIntPipe) idx: number,
    updateUserDto: Partial<CreateUserDto>,
  ): Promise<void> {
    return this.userService.updateUserByIdx(idx, updateUserDto);
  }

  @Delete('/:idx')
  async deleteUserByIdx(
    @Param('idx', ParseIntPipe) idx: number,
  ): Promise<void> {
    return this.userService.deleteUserByIdx(idx);
  }
}
