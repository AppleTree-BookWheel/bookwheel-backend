import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMessageDto } from './dto/request/create-message.dto';
import { User } from 'src/common/decorators/user.decorator';
import { GetMessageResponseDto } from './dto/response/get-message-response.dto';

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

  @Get('/received')
  public async getReceivedMessages(
    @User() user,
  ): Promise<GetMessageResponseDto[]> {
    return await this.messageService.getReceivedMessages(user.idx);
  }

  @Get('/sent')
  public async getSentMessages(@User() user): Promise<GetMessageResponseDto[]> {
    return await this.messageService.getSentMessages(user.idx);
  }

  @Get('/detail/:messageIdx')
  public async getMessageByIdx(
    @User() user,
    @Param('messageIdx', ParseIntPipe) messageIdx: number,
  ): Promise<GetMessageResponseDto | null> {
    return await this.messageService.getMessageByUserAndMessageIdx(
      user.idx,
      messageIdx,
    );
  }

  @Delete('/:messageIdx')
  public async deleteMessageByUserAndMessageIdx(
    @User() user,
    @Param('messageIdx', ParseIntPipe) messageIdx: number,
  ): Promise<void> {
    await this.messageService.deleteMessageByUserAndMessageIdx(
      user.idx,
      messageIdx,
    );
  }
}
