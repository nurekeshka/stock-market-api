import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from '../../accounts/service/accounts.service';
import { AuthorizedRequest } from '../dtos/auth-request.dto';
import { JwtResponseDto } from '../dtos/jwt-response.dto';
import { ProfileResponseDto } from '../dtos/profile.dto';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthService } from '../service/auth.service';

@Controller('api/auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Inject(AccountsService)
  private readonly accounts: AccountsService;

  @Post('sign-in')
  signIn(@Body() body: SignInDto): Promise<JwtResponseDto> {
    return this.service.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpDto): Promise<JwtResponseDto> {
    return this.service.signUp(body);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@Request() req: AuthorizedRequest): Promise<ProfileResponseDto | null> {
    return this.accounts.findOne(req.user.username);
  }
}
