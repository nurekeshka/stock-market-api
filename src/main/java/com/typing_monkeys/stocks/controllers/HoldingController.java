package com.typing_monkeys.stocks.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/holdings")
public class HoldingController {
  @GetMapping
  public ResponseEntity<String> getHolding() {
    return ResponseEntity.ok("Hello World!");
  }
}
