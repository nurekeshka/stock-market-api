package com.typing_monkeys.stocks.controllers;

import java.security.Key;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.typing_monkeys.stocks.dtos.SignInDto;
import com.typing_monkeys.stocks.dtos.SignInResponse;
import com.typing_monkeys.stocks.dtos.SignUpDto;
import com.typing_monkeys.stocks.models.Account;
import com.typing_monkeys.stocks.services.AccountService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {
  private final AccountService accountService;
  private final AuthenticationManager authenticationManager;

  @Value("${jwt.secret}")
  private String secretKey;

  @Autowired
  public AccountController(AccountService accountService, AuthenticationManager authenticationManager) {
    this.accountService = accountService;
    this.authenticationManager = authenticationManager;
  }

  @PostMapping
  public Account createAccount(@Valid @RequestBody SignUpDto signUpDto) {
    return accountService.createAccount(signUpDto);
  }

  @PostMapping("/sign-in")
  public ResponseEntity<SignInResponse> signIn(@Valid @RequestBody SignInDto signInDto) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(signInDto.getUsername(), signInDto.getPassword()));

      byte[] keyBytes = secretKey.getBytes();
      Key key = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS512.getJcaName());

      String token = Jwts.builder()
          .setSubject(signInDto.getUsername())
          .signWith(key, SignatureAlgorithm.HS512)
          .compact();

      return ResponseEntity.ok(new SignInResponse("Success!", token));
    } catch (AuthenticationException e) {
      return ResponseEntity.status(401).body(new SignInResponse("Failed to authenticate!"));
    }
  }

}
