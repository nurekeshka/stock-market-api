package com.typing_monkeys.stocks.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.typing_monkeys.stocks.dtos.SignUpDto;
import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.repositories.AccountRepository;

@Service
public class AccountService {
  private final AccountRepository repository;
  private final PasswordEncoder encoder;

  @Autowired
  public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
    this.repository = accountRepository;
    this.encoder = passwordEncoder;
  }

  public Account createAccount(SignUpDto signUpDto) {
    Account account = new Account.Builder()
        .username(signUpDto.getUsername())
        .password(encoder.encode(signUpDto.getPassword()))
        .email(signUpDto.getEmail())
        .build();

    return this.repository.save(account);
  }

}