package com.typing_monkeys.stocks.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.typing_monkeys.stocks.models.Holding;

@Repository
public interface HoldingRepository extends MongoRepository<Holding, String> {
  Holding findBySymbol(String symbol);

}
