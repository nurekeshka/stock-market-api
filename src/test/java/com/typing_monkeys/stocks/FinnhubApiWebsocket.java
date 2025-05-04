package com.typing_monkeys.stocks;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FinnhubApiWebsocket {
    public static void main(String[] args) throws URISyntaxException, IOException {
        String apiKey = Files.readString(Path.of("C:/apikeys/finnhub.txt"));
        String symbol = "MSFT";

        try {
            URI uri = new URI("wss://ws.finnhub.io?token=" + apiKey);

            WebSocketClient client = new WebSocketClient(uri) {
                @Override
                public void onOpen(ServerHandshake handshakedata) {
                    System.out.println("Connected to Finnhub WebSocket");
                    // Subscribe to a symbol
                    //send("{\"type\":\"subscribe\",\"symbol\":\"" + symbol + "\"}");
                    String send_text = "{\"type\":\"subscribe\",\"symbol\":\"" + symbol + "\"}";
                    System.out.println(send_text);
                    send(send_text);
                }

                @Override
                public void onMessage(String message) {
                    System.out.println("Received message: " + message);
                }

                @Override
                public void onClose(int code, String reason, boolean remote) {
                    System.out.println("WebSocket closed: " + reason);
                }

                @Override
                public void onError(Exception ex) {
                    ex.printStackTrace();
                }
            };

            client.connect();

        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}
