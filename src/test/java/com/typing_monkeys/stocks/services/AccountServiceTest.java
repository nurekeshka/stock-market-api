package com.typing_monkeys.stocks.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.typing_monkeys.stocks.configs.JwtConfig;
import com.typing_monkeys.stocks.dtos.SignInDto;
import com.typing_monkeys.stocks.dtos.SignUpDto;
import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.repositories.AccountRepository;

class AccountServiceTest {

  @Mock
  private AccountRepository accountRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private JwtConfig jwtConfig;

  @Mock
  private AuthenticationManager authenticationManager;

  @InjectMocks
  private AccountService accountService;

  public AccountServiceTest() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void testCreateAccount() {
    SignUpDto signUpDto = new SignUpDto();
    signUpDto.setUsername("testUser");
    signUpDto.setPassword("password123");
    signUpDto.setEmail("test@example.com");

    String encodedPassword = "encodedPassword";

    when(passwordEncoder.encode(signUpDto.getPassword())).thenReturn(encodedPassword);
    when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));

    Account account = accountService.createAccount(signUpDto);

    assertNotNull(account);
    assertEquals(signUpDto.getUsername(), account.getUsername());
    assertEquals(signUpDto.getEmail(), account.getEmail());
    assertEquals(encodedPassword, account.getPassword());
    verify(accountRepository, times(1)).save(any(Account.class));
  }

  @Test
  void testSignIn() {
    SignInDto signInDto = new SignInDto();
    signInDto.setUsername("testUser");
    signInDto.setPassword("password123");

    when(accountRepository.save(any(Account.class))).thenAnswer(invocation -> invocation.getArgument(0));
    when(this.jwtConfig.getSecret()).thenReturn(
        "74c31eff4900b98b243c91bd126a4a5bfc69de16c8eb1d75b83632185ebebbf476802f5877edca723681f6aa82fcb61300bf5fe8c9a2fcdb7e997fe801ea1f9f2f00c9039ecff596208ee6aac3b47b19a6401b8b2ad342db23cf3495c25c618a03cdd4e8c9f7ee7319c6a36a8e2495559c3de53eec2090dd958485a46757dfa4");

    String token = accountService.signIn(signInDto);

    assertNotNull(token);
    verify(authenticationManager, times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
  }
}
