package com.typing_monkeys.stocks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.typing_monkeys.stocks.Websocket.Client.FinnHubClient;

@RestController
@RequestMapping("/api/stocks")
public class WebsocketController {
    @Autowired
    private FinnHubClient finnHubClient;

    public WebsocketController(FinnHubClient finnHubClient) {
        this.finnHubClient = finnHubClient;
    }

    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        boolean connected = finnHubClient.isConnected();
        return ResponseEntity.ok(connected ? "Connected" : "Disconnected");
    }

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribe(@RequestParam String symbol) {
        if (!finnHubClient.isConnected()) {
            return ResponseEntity.status(503).body("WebSocket is not connected");
        }
        finnHubClient.sendMessage("{\"type\":\"subscribe\",\"symbol\":\"" + symbol + "\"}");
        return ResponseEntity.ok("Subscribed to " + symbol);
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<String> unsubscribe(@RequestParam String symbol) {
        if (!finnHubClient.isConnected()) {
            return ResponseEntity.status(503).body("WebSocket is not connected");
        }
        finnHubClient.unsubscribe(symbol);
        return ResponseEntity.ok("Unsubscribed from " + symbol);
    }
}
