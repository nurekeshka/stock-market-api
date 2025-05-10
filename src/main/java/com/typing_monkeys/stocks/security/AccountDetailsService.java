package com.typing_monkeys.stocks.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.repositories.AccountRepository;

@Service
public class AccountDetailsService implements UserDetailsService {

  private final AccountRepository repository;

  public AccountDetailsService(AccountRepository accountRepository) {
    this.repository = accountRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Account account = repository.findByUsername(username);

    if (account == null) {
      throw new UsernameNotFoundException("User not found with username: " + username);
    }

    return new AccountDetails(account);
  }

}