import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  password: string;
}
