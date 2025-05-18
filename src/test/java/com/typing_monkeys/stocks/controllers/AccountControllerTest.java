package com.typing_monkeys.stocks.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.typing_monkeys.stocks.dtos.SignInDto;
import com.typing_monkeys.stocks.dtos.SignInResponse;
import com.typing_monkeys.stocks.dtos.SignUpDto;
import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.services.AccountService;

class AccountControllerTest {

  @Mock
  private AccountService accountService;

  @InjectMocks
  private AccountController accountController;

  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
  }

  @Test
  void testCreateAccount() throws Exception {
    Account account = new Account.Builder()
        .username("testUser")
        .email("test@example.com")
        .password("Password123!")
        .build();

    SignUpDto signUpDto = new SignUpDto();
    signUpDto.setUsername(account.getUsername());
    signUpDto.setPassword(account.getPassword());
    signUpDto.setEmail(account.getEmail());

    when(accountService.createAccount(any(SignUpDto.class))).thenReturn(account);

    mockMvc.perform(post("/api/accounts")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(signUpDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value(account.getUsername()))
        .andExpect(jsonPath("$.email").value(account.getEmail()));
  }

  @Test
  void testSignInSuccess() throws Exception {
    SignInDto signInDto = new SignInDto();
    signInDto.setUsername("testUser");
    signInDto.setPassword("Password123!");

    SignInResponse response = new SignInResponse("Success!", "mockToken");

    when(accountService.signIn(any(SignInDto.class))).thenReturn(response.getToken());

    mockMvc.perform(post("/api/accounts/sign-in")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(signInDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.message").value(response.getMessage()))
        .andExpect(jsonPath("$.token").value(response.getToken()));
  }

  @Test
  void testSignInFailure() throws Exception {
    SignInDto signInDto = new SignInDto();
    signInDto.setUsername("testUser");
    signInDto.setPassword("WrongPassword");

    when(accountService.signIn(any(SignInDto.class))).thenThrow(new RuntimeException("Authentication failed"));

    mockMvc.perform(post("/api/accounts/sign-in")
        .contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(signInDto)))
        .andExpect(status().isUnauthorized());
  }
}
