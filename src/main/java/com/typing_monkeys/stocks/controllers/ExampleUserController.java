package com.typing_monkeys.stocks.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class ExampleUserController {

  @GetMapping
  public Object getUsers() {
    return new Object() {
      @SuppressWarnings("unused")
      public String name = "John Doe";
      @SuppressWarnings("unused")
      public String email = "Something";
    };
  }
}