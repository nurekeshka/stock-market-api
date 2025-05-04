package com.typing_monkeys.stocks;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;

public class FinnhubApiOnetime {
    public static void main(String[] args) throws IOException {
        String apiKey = Files.readString(Path.of("C:/apikeys/finnhub.txt"));
        String symbol = "MSFT";
        String endpoint = "https://finnhub.io/api/v1/quote?symbol=" + symbol + "&token=" + apiKey;

        try {
            URL url = new URL(endpoint);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(connection.getInputStream())
            );
            String inputLine;
            StringBuilder content = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }

            in.close();
            connection.disconnect();

            JSONObject json = new JSONObject(content.toString());
            System.out.println(json);

        } catch (Exception e) {e.printStackTrace();}
    }
}
