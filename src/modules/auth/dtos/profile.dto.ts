import { Holding } from '../../accounts/schemas/holdings.schema';

export class ProfileResponseDto {
  email: string;
  holdings: Holding[];
}
