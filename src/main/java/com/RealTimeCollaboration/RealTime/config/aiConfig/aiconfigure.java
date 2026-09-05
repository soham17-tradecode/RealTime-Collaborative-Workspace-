package com.RealTimeCollaboration.RealTime.config.aiConfig;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class aiconfigure {
    @Bean
    public ChatClient chatClient(ChatClient.Builder builder)
    {
        return builder.build();
    }
}
