package com.typing_monkeys.stocks.Websocket.Client;

import java.io.IOException;
import java.net.URI;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.typing_monkeys.stocks.dtos.finnhubDto.StockDto;

import jakarta.annotation.PostConstruct;
import jakarta.websocket.ClientEndpoint;
import jakarta.websocket.CloseReason;
import jakarta.websocket.ContainerProvider;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.WebSocketContainer;

@Component
@ClientEndpoint
public class FinnHubClient {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String finnhubUrl = "wss://ws.finnhub.io?token=d0kqpohr01qn937mgulgd0kqpohr01qn937mgum0";
    private Session session;

    @PostConstruct
    public void start() {
        try {
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            container.connectToServer(this, URI.create(finnhubUrl));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket opened: " + session.getId());
        this.session = session;

        // 订阅多个股票
        sendMessage("{\"type\":\"subscribe\",\"symbol\":\"AAPL\"}");
        sendMessage("{\"type\":\"subscribe\",\"symbol\":\"BINANCE:BTCUSDT\"}");
        sendMessage("{\"type\":\"subscribe\",\"symbol\":\"IC MARKETS:1\"}");
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println("Received message: " + message);
        try {
            StockDto stockDto = objectMapper.readValue(message, StockDto.class);
            // 处理 stockDto 数据
            if ("trade".equals(stockDto.getType()) && stockDto.getData() != null) {
                stockDto.getData().forEach(trade -> {
                    System.out.printf("Symbol: %s, Price: %.2f, Volume: %d, Timestamp: %d%n",
                            trade.getS(), trade.getP(), trade.getV(), trade.getT());
                });
            }
        } catch (IOException e) {
            System.err.println("Failed to parse message: " + message);
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) {
        System.out.println("WebSocket closed: " + session.getId() + " Reason: " + closeReason);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.err.println("WebSocket error on session: " + (session != null ? session.getId() : "null"));
        throwable.printStackTrace();
    }

    public void sendMessage(String message) {
        if (session != null && session.isOpen()) {
            session.getAsyncRemote().sendText(message);
        } else {
            System.err.println("Session not open, cannot send message");
        }
    }

    public void unsubscribe(String symbol) {
        sendMessage("{\"type\":\"unsubscribe\",\"symbol\":\"" + symbol + "\"}");
    }

    public boolean isConnected() {
        return session != null && session.isOpen();
    }
}
