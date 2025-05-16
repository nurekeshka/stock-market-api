package com.typing_monkeys.stocks.models;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * The {@code Holding} class represents a financial holding, which consists of a
 * symbol,
 * a list of transactions, the total value of the holding, and the total number
 * of shares.
 * It is an immutable class that uses a builder pattern for construction.
 * 
 * <p>
 * This class calculates the total value and shares based on the provided
 * transactions.
 * Transactions can either be of type BUY or SELL, and the shares are adjusted
 * accordingly.
 * 
 * <p>
 * Example usage:
 * 
 * <pre>{@code
 * Holding holding = new Holding.Builder()
 *     .symbol("AAPL")
 *     .transactions(transactionsList)
 *     .build();
 * }</pre>
 * 
 * <p>
 * Note: This class is thread-safe as it is immutable.
 * 
 * <p>
 * Fields:
 * <ul>
 * <li>{@code symbol} - The stock symbol associated with the holding.</li>
 * <li>{@code value} - The total value of the holding, calculated from
 * transactions.</li>
 * <li>{@code shares} - The total number of shares, calculated from
 * transactions.</li>
 * <li>{@code transactions} - The list of transactions associated with the
 * holding.</li>
 * </ul>
 * 
 * <p>
 * Nested Classes:
 * <ul>
 * <li>{@code Builder} - A static nested class used to construct an instance of
 * {@code Holding}.</li>
 * </ul>
 * 
 * <p>
 * Implements:
 * <ul>
 * <li>{@code Serializable} - Allows the class to be serialized.</li>
 * </ul>
 * 
 * <p>
 * Methods:
 * <ul>
 * <li>{@code getSymbol()} - Returns the stock symbol of the holding.</li>
 * <li>{@code getShares()} - Returns the total number of shares in the
 * holding.</li>
 * <li>{@code getValue()} - Returns the total value of the holding.</li>
 * <li>{@code getTransactions()} - Returns the list of transactions associated
 * with the holding.</li>
 * </ul>
 */
public class Holding implements Serializable {

  public static class Builder {
    private String symbol;
    private List<Transaction> transactions;

    public Builder symbol(String symbol) {
      this.symbol = symbol;
      return this;
    }

    public Builder transactions(List<Transaction> transactions) {
      this.transactions = transactions;
      return this;
    }

    public Holding build() {
      return new Holding(this);
    }
  }

  private final String symbol;
  private final BigDecimal value;
  private final BigDecimal shares;
  private final List<Transaction> transactions;

  private Holding(Builder builder) {
    this.symbol = builder.symbol;
    this.transactions = builder.transactions;

    this.value = transactions.stream()
        .map(Transaction::getValue)
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    this.shares = transactions.stream()
        .map(transaction -> switch (transaction.getType()) {
          case BUY -> transaction.getShares();
          case SELL -> transaction.getShares().negate();
        })
        .reduce(BigDecimal.ZERO, BigDecimal::add);
  }

  public String getSymbol() {
    return symbol;
  }

  public BigDecimal getShares() {
    return shares;
  }

  public BigDecimal getValue() {
    return value;
  }

  public List<Transaction> getTransactions() {
    return transactions;
  }

}