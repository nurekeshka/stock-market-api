import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { JwtResponseDto } from '../dtos/jwt-response.dto';
import { ProfileResponseDto } from '../dtos/profile.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthService } from '../service/auth.service';

@Controller('api/auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('sign-in')
  signIn(@Body() body: SignInDto): Promise<JwtResponseDto> {
    return this.service.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpDto): Promise<JwtResponseDto> {
    return this.service.signUp(body);
  }

  @Get('me')
  me(): Promise<ProfileResponseDto> {
    return {} as never;
  }
}
