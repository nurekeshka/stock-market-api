package com.typing_monkeys.stocks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.typing_monkeys.stocks.dtos.SignUpDto;
import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.repositories.AccountRepository;

@Service
public class AccountService {
  private final AccountRepository accountRepository;

  @Autowired
  public AccountService(AccountRepository accountRepository) {
    this.accountRepository = accountRepository;
  }

  public Account createAccount(SignUpDto signUpDto) {
    Account account = new Account.Builder()
        .username(signUpDto.getUsername())
        .password(signUpDto.getPassword())
        .email(signUpDto.getEmail())
        .build();

    return this.accountRepository.save(account);
  }

}
