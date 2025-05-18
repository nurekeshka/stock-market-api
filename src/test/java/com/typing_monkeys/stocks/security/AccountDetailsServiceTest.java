package com.typing_monkeys.stocks.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.repositories.AccountRepository;

class AccountDetailsServiceTest {

  @Mock
  private AccountRepository accountRepository;

  @InjectMocks
  private AccountDetailsService accountDetailsService;

  public AccountDetailsServiceTest() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testLoadUserByUsername_UserExists() {
    Account account = new Account.Builder()
        .username("testUser")
        .password("password123")
        .email("test@example.com")
        .build();

    when(accountRepository.findByUsername(account.getUsername())).thenReturn(account);

    AccountDetails accountDetails = (AccountDetails) accountDetailsService.loadUserByUsername("testUser");

    assertNotNull(accountDetails);
    assertEquals(account.getUsername(), accountDetails.getUsername());
    assertEquals(account.getPassword(), accountDetails.getPassword());
  }

  @Test
  void testLoadUserByUsername_UserNotFound() {
    String nonExistentUsername = "nonExistentUser";

    when(accountRepository.findByUsername(nonExistentUsername)).thenReturn(null);

    assertThrows(UsernameNotFoundException.class, () -> {
      accountDetailsService.loadUserByUsername(nonExistentUsername);
    });
  }
}
