package com.typing_monkeys.stocks.repositories;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.typing_monkeys.stocks.models.Account;

@Repository
public interface AccountRepository extends MongoRepository<Account, UUID> {
  Account findByUsername(String username);

  Account findByEmail(String email);
}
