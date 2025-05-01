package com.stockmarket.stock_market.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stockmarket.stock_market.POJO.ExampleUser;

@Repository
public interface ExampleUserRepository extends MongoRepository<ExampleUser, String> {
}