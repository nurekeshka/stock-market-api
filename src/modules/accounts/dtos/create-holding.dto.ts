import { IsString } from 'class-validator';

export class CreateHoldingDto {
  @IsString()
  symbol: string;

  @IsString()
  name: string;

  @IsString()
  icon: string;
}
