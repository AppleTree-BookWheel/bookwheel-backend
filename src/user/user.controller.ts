import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('id/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('/:idx')
  async getUserByIdx(@Param('idx', ParseIntPipe) idx: number) {
    return this.userService.getUserByIdx(idx);
  }
}
