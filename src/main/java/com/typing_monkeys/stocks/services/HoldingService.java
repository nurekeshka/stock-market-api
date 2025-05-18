package com.typing_monkeys.stocks.services;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Currency;

import org.springframework.beans.factory.annotation.Autowired;

import com.typing_monkeys.stocks.models.Holding;
import com.typing_monkeys.stocks.models.Transaction;
import com.typing_monkeys.stocks.repositories.HoldingRepository;
import com.typing_monkeys.stocks.repositories.TransactionRepository;

public class HoldingService {
    @Autowired
    private HoldingRepository holdingRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    public HoldingService(HoldingRepository holdingRepository, TransactionRepository transactionRepository) {
        this.holdingRepository = holdingRepository;
        this.transactionRepository = transactionRepository;
    }

    public void buyHolding(Holding holding) {

        Transaction transaction = new Transaction.Builder()
                .type(Transaction.Type.BUY)
                .price(new BigDecimal("100.00"))
                .shares(new BigDecimal("10"))
                .currency(Currency.getInstance("USD"))
                .timestamp(ZonedDateTime.now())
                .build();
        Holding existingHolding = holdingRepository.findBySymbol(holding.getSymbol());
        existingHolding.getTransactions().add(transaction);
        holdingRepository.save(existingHolding);

    }

    public void sellHolding(Holding holding) {
        Transaction transaction = new Transaction.Builder()
                .type(Transaction.Type.SELL)
                .price(new BigDecimal("150.00"))
                .shares(new BigDecimal("10"))
                .currency(Currency.getInstance("USD"))
                .timestamp(ZonedDateTime.now())
                .build();
        Holding existingHolding = holdingRepository.findBySymbol(holding.getSymbol());
        existingHolding.getTransactions().add(transaction);
        holdingRepository.save(existingHolding);
    }

}
