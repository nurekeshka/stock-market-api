package com.typing_monkeys.stocks.repositories;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.typing_monkeys.stocks.models.Transaction;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {

  List<Transaction> findByType(Transaction.Type type);

  Page<Transaction> findByType(Transaction.Type type, Pageable pageable);

  List<Transaction> findByTimestampBetween(ZonedDateTime start, ZonedDateTime end);

}