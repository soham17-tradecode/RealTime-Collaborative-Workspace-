package com.RealTimeCollaboration.RealTime.service.aiService;

import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.aiChatRequest;
import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.aiChatResponse;
//import com.RealTimeCollaboration.RealTime.client.geminiClient;
import com.RealTimeCollaboration.RealTime.client.llmClient;
import com.RealTimeCollaboration.RealTime.context.contextBuilder;
import com.RealTimeCollaboration.RealTime.prompt.promptBuilder;
import org.springframework.stereotype.Service;

@Service

public class aiAgentService {
//    private final geminiClient geminiClient;
    private final promptBuilder promptBuilder;
    private final llmClient llmClient;
    private final contextBuilder contextBuilder;

    public aiAgentService(promptBuilder promptBuilder, llmClient llmClient, contextBuilder contextBuilder) {
        this.promptBuilder = promptBuilder;
        this.llmClient = llmClient;
        this.contextBuilder = contextBuilder;
    }


    public String chat(aiChatRequest request)
    {
        aiChatRequest context = contextBuilder.buildContext(request);
        String prompt = promptBuilder.buildPrompt(context);
        return llmClient.chat(prompt);
    }
}
