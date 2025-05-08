package com.tagwise.backend.responses;

import lombok.Getter;
import lombok.Setter;

public class LoginResponse {
    private String token;
    private long expiresIn;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public LoginResponse(String token, long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
    }
    @Override
    public String toString() {
        return "LoginResponse{token='" + token + "', expiresIn=" + expiresIn + "}";
    }
}