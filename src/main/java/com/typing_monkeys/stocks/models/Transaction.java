package com.typing_monkeys.stocks.models;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Currency;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

/**
 * Represents a financial transaction in the stock market.
 * A transaction can either be a BUY or SELL operation, and it includes details
 * such as price, shares, timestamp, and currency.
 * 
 * <p>
 * This class uses the Builder pattern to construct instances. It ensures
 * that the required fields (type, price, and shares) are set before creating
 * a Transaction object. The value of the transaction is calculated based on
 * the type (BUY or SELL).
 * </p>
 * 
 * <p>
 * Example usage:
 * </p>
 * 
 * <pre>{@code
 * Transaction transaction = new Transaction.Builder()
 *     .type(Transaction.Type.BUY)
 *     .price(new BigDecimal("100.50"))
 *     .shares(new BigDecimal("10"))
 *     .currency(Currency.getInstance("USD"))
 *     .build();
 * }</pre>
 * 
 * <p>
 * Fields:
 * </p>
 * <ul>
 * <li><b>type</b>: The type of transaction (BUY or SELL).</li>
 * <li><b>price</b>: The price per share of the transaction.</li>
 * <li><b>shares</b>: The number of shares involved in the transaction.</li>
 * <li><b>value</b>: The total value of the transaction, calculated as
 * price * shares for BUY, or -(price * shares) for SELL.</li>
 * <li><b>timestamp</b>: The timestamp of the transaction. Defaults to the
 * current time if not provided.</li>
 * <li><b>currency</b>: The currency of the transaction. Defaults to USD
 * if not provided.</li>
 * </ul>
 * 
 * <p>
 * Nested Types:
 * </p>
 * <ul>
 * <li><b>Builder</b>: A static nested class used to construct Transaction
 * instances using the Builder pattern.</li>
 * <li><b>Type</b>: An enum representing the type of transaction (BUY or SELL).
 * Includes a method to parse a string value into a Type.</li>
 * </ul>
 * 
 * <p>
 * Exceptions:
 * </p>
 * <ul>
 * <li><b>IllegalArgumentException</b>: Thrown if required fields (type, price,
 * or shares) are not set, or if an unknown transaction type is provided.</li>
 * </ul>
 * 
 * <p>
 * Thread Safety:
 * </p>
 * This class is immutable and thread-safe once constructed.
 */
public class Transaction implements Serializable {

  public static class Builder {
    private String transactionId = UUID.randomUUID().toString();
    private Type type;
    private BigDecimal price;
    private BigDecimal shares;
    private ZonedDateTime timestamp;
    private Currency currency;

    public Builder transactionId(String transactionId) {
      this.transactionId = transactionId;
      return this;
    }

    public Builder type(Type type) {
      this.type = type;
      return this;
    }

    public Builder price(BigDecimal price) {
      this.price = price;
      return this;
    }

    public Builder shares(BigDecimal shares) {
      this.shares = shares;
      return this;
    }

    public Builder timestamp(ZonedDateTime timestamp) {
      this.timestamp = timestamp;
      return this;
    }

    public Builder currency(Currency currency) {
      this.currency = currency;
      return this;
    }

    public Transaction build() {
      return new Transaction(this);
    }
  }

  public enum Type {
    BUY("BUY"),
    SELL("SELL");

    public static Type fromValue(String value) {
      for (Type type : Type.values()) {
        if (type.value.equalsIgnoreCase(value)) {
          return type;
        }
      }
      throw new IllegalArgumentException("Unknown transaction type: " + value);
    }

    private final String value;

    Type(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }
  }

  @Id
  private final String transactionId;
  private final Type type;
  private final BigDecimal price;
  private final BigDecimal shares;
  private final BigDecimal value;

  @Indexed
  private final ZonedDateTime timestamp;

  private final Currency currency;

  private Transaction(Builder builder) {
    this.transactionId = builder.transactionId;
    this.type = builder.type;
    this.price = builder.price;
    this.shares = builder.shares;
    this.timestamp = builder.timestamp != null ? builder.timestamp : ZonedDateTime.now();
    this.currency = builder.currency != null ? builder.currency : Currency.getInstance("USD");

    if (type == null || price == null || shares == null) {
      throw new IllegalArgumentException("type, price, and shares must be set.");
    }

    this.value = switch (type) {
      case BUY -> price.multiply(shares);
      case SELL -> price.multiply(shares).negate();
      default -> throw new IllegalArgumentException("Unknown transaction type: " + type);
    };
  }

  public String getTransactionId() {
    return transactionId;
  }

  public Type getType() {
    return type;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public BigDecimal getShares() {
    return shares;
  }

  public BigDecimal getValue() {
    return value;
  }

  public ZonedDateTime getTimestamp() {
    return timestamp;
  }

  public Currency getCurrency() {
    return currency;
  }

}