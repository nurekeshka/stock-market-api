package com.typing_monkeys.stocks.services;

import java.security.Key;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.typing_monkeys.stocks.configs.JwtConfig;
import com.typing_monkeys.stocks.dtos.SignInDto;
import com.typing_monkeys.stocks.dtos.SignUpDto;
import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.repositories.AccountRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AccountService {
  private final AccountRepository accountRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtConfig jwtConfig;

  @Autowired
  public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder,
      AuthenticationManager authenticationManager, JwtConfig jwtConfig) {
    this.accountRepository = accountRepository;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    this.jwtConfig = jwtConfig;
  }

  public Account createAccount(SignUpDto signUpDto) {
    Account account = new Account.Builder()
        .username(signUpDto.getUsername())
        .password(passwordEncoder.encode(signUpDto.getPassword()))
        .email(signUpDto.getEmail())
        .build();

    return this.accountRepository.save(account);
  }

  public String signIn(SignInDto signInDto) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(signInDto.getUsername(), signInDto.getPassword()));

    byte[] keyBytes = jwtConfig.getSecret().getBytes();
    Key key = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS512.getJcaName());

    return Jwts.builder()
        .setSubject(signInDto.getUsername())
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();
  }

}