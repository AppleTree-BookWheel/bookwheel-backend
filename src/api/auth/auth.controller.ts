import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendVerificationEmailDto } from './dto/request/send-verification-email.dto';
import { VerifyCodeDto } from './dto/request/verify-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-code')
  @UsePipes(ValidationPipe)
  public async sendVerificationEmail(
    @Body() sendVerificationEmailDto: SendVerificationEmailDto,
  ): Promise<void> {
    await this.authService.sendVerificationEmail(sendVerificationEmailDto);
  }

  @Post('verify-code')
  @UsePipes(ValidationPipe)
  public async verifyCode(@Body() verifyCodeDto: VerifyCodeDto): Promise<void> {
    await this.authService.verifyCode(verifyCodeDto);
  }
}
