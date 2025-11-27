import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendVerificationEmailDto } from './dto/request/send-verification-email.dto';
import { VerifyCodeDto } from './dto/request/verify-code.dto';
import { CreateUserDto } from './dto/request/create-user.dto';
import { LoginDto } from './dto/request/login.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { ReissueTokenSetResponseDto } from './dto/response/reissue-token-set-response.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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

  @Post('login')
  @UsePipes(ValidationPipe)
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  public async logout(@User() user): Promise<void> {
    return await this.authService.logout(user.idx);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async reissueTokens(
    @User() user,
  ): Promise<ReissueTokenSetResponseDto> {
    return await this.authService.reissueTokenSet({
      refreshTokenId: user.refreshTokenId,
      idx: user.idx,
    });
  }
}
