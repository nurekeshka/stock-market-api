package com.typing_monkeys.stocks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.typing_monkeys.stocks.dtos.SignUpDto;
import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.services.AccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
  private final AccountService accountService;

  @Autowired
  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  @PostMapping
  public Account createAccount(@Valid @RequestBody SignUpDto signUpDto) {
    return accountService.createAccount(signUpDto);
  }

}
