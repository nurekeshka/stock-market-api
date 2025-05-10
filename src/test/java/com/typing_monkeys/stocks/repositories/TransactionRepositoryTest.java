package com.typing_monkeys.stocks.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import com.typing_monkeys.stocks.models.Transaction;

@DataMongoTest
class TransactionRepositoryTest {

  @Autowired
  private TransactionRepository transactionRepository;

  @Test
  void testFindByType() {
    Transaction transaction = new Transaction.Builder()
        .type(Transaction.Type.BUY)
        .price(new BigDecimal("100.00"))
        .shares(new BigDecimal("10"))
        .timestamp(ZonedDateTime.now())
        .build();
    transactionRepository.save(transaction);

    List<Transaction> transactions = transactionRepository.findByType(Transaction.Type.BUY);
    assertEquals(1, transactions.size());
  }
}