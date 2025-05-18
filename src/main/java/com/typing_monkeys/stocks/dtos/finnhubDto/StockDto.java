package com.typing_monkeys.stocks.dtos.finnhubDto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StockDto {

    @JsonProperty("type")
    private String type;

    @JsonProperty("data")
    private List<TradeData> data;

    // getter & setter
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<TradeData> getData() {
        return data;
    }

    public void setData(List<TradeData> data) {
        this.data = data;
    }

    public static class TradeData {

        @JsonProperty("s")
        private String s;

        @JsonProperty("p")
        private double p;

        @JsonProperty("t")
        private long t;

        @JsonProperty("v")
        private long v;

        @JsonProperty("c")
        private List<Integer> c;

        // getter & setter
        public String getS() {
            return s;
        }

        public void setS(String s) {
            this.s = s;
        }

        public double getP() {
            return p;
        }

        public void setP(double p) {
            this.p = p;
        }

        public long getT() {
            return t;
        }

        public void setT(long t) {
            this.t = t;
        }

        public long getV() {
            return v;
        }

        public void setV(long v) {
            this.v = v;
        }

        public List<Integer> getC() {
            return c;
        }

        public void setC(List<Integer> c) {
            this.c = c;
        }
    }
}
