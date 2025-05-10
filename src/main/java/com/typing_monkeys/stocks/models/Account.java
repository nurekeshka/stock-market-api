package com.typing_monkeys.stocks.models;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents an account in the stock market application.
 * This class is immutable and uses a builder pattern for instantiation.
 * It is annotated as a MongoDB document with the collection name "accounts".
 * 
 * <p>
 * Fields:
 * <ul>
 * <li><b>uuid</b>: A unique identifier for the account. If not provided, a
 * random UUID is generated.</li>
 * <li><b>username</b>: The username associated with the account.</li>
 * <li><b>email</b>: The email address associated with the account.</li>
 * <li><b>password</b>: The account's password, which is write-only and
 * transient for security purposes.</li>
 * <li><b>holdings</b>: A list of holdings associated with the account,
 * defaulting to an empty list if not provided.</li>
 * </ul>
 * 
 * <p>
 * Features:
 * <ul>
 * <li>Provides a builder class for constructing instances of the Account
 * class.</li>
 * <li>Supports login functionality by validating the provided password.</li>
 * <li>Ensures immutability by making all fields final and initializing them in
 * the constructor.</li>
 * </ul>
 * 
 * <p>
 * Usage Example:
 * 
 * <pre>{@code
 * Account account = new Account.Builder()
 *     .username("john_doe")
 *     .email("john.doe@example.com")
 *     .password("securePassword123")
 *     .build();
 * }</pre>
 * 
 * <p>
 * Annotations:
 * <ul>
 * <li>{@code @Document}: Indicates that this class is a MongoDB document.</li>
 * <li>{@code @Id}: Marks the UUID field as the primary identifier for the
 * document.</li>
 * <li>{@code @JsonProperty}: Configures the password field to be write-only in
 * JSON serialization.</li>
 * </ul>
 * 
 * <p>
 * Thread Safety:
 * This class is immutable and therefore thread-safe.
 */
@Document(collection = "accounts")
public class Account implements Serializable {

  public static class Builder {
    private UUID uuid;
    private String username;
    private String email;
    private String password;
    private List<Holding> holdings;

    public Builder uuid(UUID uuid) {
      this.uuid = uuid;
      return this;
    }

    public Builder username(String username) {
      this.username = username;
      return this;
    }

    public Builder email(String email) {
      this.email = email;
      return this;
    }

    public Builder password(String password) {
      this.password = password;
      return this;
    }

    public Builder holdings(List<Holding> holdings) {
      this.holdings = holdings;
      return this;
    }

    public Account build() {
      return new Account(this);
    }

  }

  @Id
  private final UUID uuid;
  private final String username;

  private final String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private final transient String password;

  private final List<Holding> holdings;

  private Account(Builder builder) {
    this.username = builder.username;
    this.email = builder.email;
    this.password = builder.password;
    this.uuid = builder.uuid != null ? builder.uuid : UUID.randomUUID();
    this.holdings = builder.holdings != null ? builder.holdings : List.of();
  }

  public UUID getUuid() {
    return uuid;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public List<Holding> getHoldings() {
    return holdings;
  }

}