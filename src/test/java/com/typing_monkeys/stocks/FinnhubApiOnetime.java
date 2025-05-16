package com.typing_monkeys.stocks;

import org.json.JSONException;
import java.io.IOException;

public class FinnhubApiOnetime {
    public static void main(String[] args) throws IOException, JSONException {
        FinnhubApiFormatted apitest = new FinnhubApiFormatted("MSFT");
        System.out.println(apitest.getData());
    }
}
