package com.RealTimeCollaboration.RealTime.config.restClientConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class restClientConfig {
    @Bean
    public WebClient webClient()
    {
        return WebClient.builder().build();
    }
}
