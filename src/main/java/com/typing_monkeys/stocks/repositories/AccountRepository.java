package com.typing_monkeys.stocks.repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.typing_monkeys.stocks.models.Account;

public interface AccountRepository extends MongoRepository<Account, UUID> {
  Account findByUsername(String username);

  Account findByEmail(String email);
}
