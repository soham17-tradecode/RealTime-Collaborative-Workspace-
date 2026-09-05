package com.RealTimeCollaboration.RealTime.client;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Component;

@Component
public class springAiClient implements llmClient {
    private final ChatClient chatClient;


    public springAiClient(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @Override
    public String chat(String prompt)
    {
        return chatClient
                .prompt()
                .user(prompt)
                .call()
                .content();
    }
}
