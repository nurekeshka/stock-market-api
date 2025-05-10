package com.typing_monkeys.stocks.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.typing_monkeys.stocks.models.Holding;

public interface HoldingRepository extends MongoRepository<Holding, String> {
  Holding findBySymbol(String symbol);
}
