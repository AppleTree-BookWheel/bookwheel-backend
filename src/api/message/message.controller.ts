import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMessageDto } from './dto/request/create-message.dto';
import { User } from 'src/common/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  public async createMessage(
    @User() user,
    @Body() dto: CreateMessageDto,
  ): Promise<void> {
    await this.messageService.createMessage(user.idx, dto);
  }
}
