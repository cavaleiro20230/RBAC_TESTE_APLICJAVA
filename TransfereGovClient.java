package com.api.transferegov.service;

import com.api.transferegov.config.TransfereGovConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TransfereGovClient {

    private final RestTemplate restTemplate;
    private final TransfereGovConfig config;

    @Autowired
    public TransfereGovClient(RestTemplate restTemplate, TransfereGovConfig config) {
        this.restTemplate = restTemplate;
        this.config = config;
    }

    public <T> ResponseEntity<T> get(String path, Class<T> responseType) {
        HttpHeaders headers = createHeaders();
        HttpEntity<?> entity = new HttpEntity<>(headers);
        
        return restTemplate.exchange(
            config.getApiUrl() + path,
            HttpMethod.GET,
            entity,
            responseType
        );
    }

    public <T, R> ResponseEntity<R> post(String path, T body, Class<R> responseType) {
        HttpHeaders headers = createHeaders();
        HttpEntity<T> entity = new HttpEntity<>(body, headers);
        
        return restTemplate.exchange(
            config.getApiUrl() + path,
            HttpMethod.POST,
            entity,
            responseType
        );
    }

    public <T, R> ResponseEntity<R> put(String path, T body, Class<R> responseType) {
        HttpHeaders headers = createHeaders();
        HttpEntity<T> entity = new HttpEntity<>(body, headers);
        
        return restTemplate.exchange(
            config.getApiUrl() + path,
            HttpMethod.PUT,
            entity,
            responseType
        );
    }

    public <R> ResponseEntity<R> delete(String path, Class<R> responseType) {
        HttpHeaders headers = createHeaders();
        HttpEntity<?> entity = new HttpEntity<>(headers);
        
        return restTemplate.exchange(
            config.getApiUrl() + path,
            HttpMethod.DELETE,
            entity,
            responseType
        );
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + config.getApiKey());
        headers.set("Content-Type", "application/json");
        return headers;
    }
}