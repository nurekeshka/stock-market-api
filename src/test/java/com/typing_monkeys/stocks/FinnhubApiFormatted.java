package com.typing_monkeys.stocks;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;

public class FinnhubApiFormatted {
    JSONObject findata = new JSONObject();

    public FinnhubApiFormatted(String name, String symbol, Double currentprice) throws JSONException {
        JSONObject findata = new JSONObject();
        findata.put("name", name);
        findata.put("symbol", symbol);
        findata.put("currentprice", currentprice);
    }

    public FinnhubApiFormatted(String symbol) throws IOException, JSONException {
        String nameToAdd = null;
        Double priceToAdd = null;
        String apiKey = Files.readString(Path.of("C:/apikeys/finnhub.txt"));
        String endpointCompanyInfo = "https://finnhub.io/api/v1/stock/profile2?symbol=" + symbol + "&token=" + apiKey;
        try {
            URL url = new URL(endpointCompanyInfo);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {content.append(inputLine);}
            in.close();
            connection.disconnect();
            nameToAdd = new JSONObject(content.toString()).getString("name");
        } catch (Exception e) {e.printStackTrace();}
        String endpointQuote = "https://finnhub.io/api/v1/quote?symbol=" + symbol + "&token=" + apiKey;
        try {
            URL url = new URL(endpointQuote);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {content.append(inputLine);}
            in.close();
            connection.disconnect();
            priceToAdd = Double.valueOf(new JSONObject(content.toString()).getString("c"));
        } catch (Exception e) {e.printStackTrace();}
        findata.put("name", nameToAdd);
        findata.put("symbol", symbol);
        findata.put("currentprice", priceToAdd);
    }

    public JSONObject getData() {
        return findata;
    }
}
