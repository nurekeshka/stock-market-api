import { Holding } from '../../accounts/schemas/holdings.schema';

export class ProfileResponseDto {
  username: string;
  email: string;
  holdings: Holding[];
}
