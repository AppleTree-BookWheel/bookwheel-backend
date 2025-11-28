import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('id')
  async getUserById(
    @Body('id') id: string,
  ): Promise<GetUserResponseDto | null> {
    return this.userService.getUserById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserByIdx(@User() user): Promise<GetUserResponseDto> {
    return this.userService.getUserByIdx(user.idx);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateUserByIdx(
    @User() user,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUserByIdx(user.idx, updateUserDto);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  async updatePasswordByIdx(
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
