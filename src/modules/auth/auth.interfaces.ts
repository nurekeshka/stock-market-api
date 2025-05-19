export interface AccountDto {
  password: string;
  toObject(): AccountDto;
}

export interface AccountsServiceInterface {
  findOne(email: string): Promise<AccountDto>;
}
