package com.typing_monkeys.stocks.dtos;

import java.io.Serializable;

public class SignInResponse implements Serializable {
  public final String token;
  public final String message;

  public SignInResponse(String message, String token) {
    this.token = token;
    this.message = message;
  }

  public SignInResponse(String message) {
    this.token = null;
    this.message = message;
  }
}
