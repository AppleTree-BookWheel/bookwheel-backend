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
import { CreateUserDto } from './dto/request/create-user.dto';

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

  @Post('check-duplicate-id')
  @UsePipes(ValidationPipe)
  public async checkDuplicateId(@Body() id: string): Promise<boolean> {
    return await this.authService.checkDuplicateId(id);
  }

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  public async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.signUp(createUserDto);
  }
}
