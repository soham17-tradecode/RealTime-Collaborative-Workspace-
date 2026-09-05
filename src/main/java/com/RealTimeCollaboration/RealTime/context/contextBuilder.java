package com.RealTimeCollaboration.RealTime.context;

import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.aiChatRequest;
import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.aiChatResponse;
import org.springframework.stereotype.Component;

@Component
public class contextBuilder {

    public aiChatRequest buildContext(aiChatRequest request)
    {
        return request;
    }
}
