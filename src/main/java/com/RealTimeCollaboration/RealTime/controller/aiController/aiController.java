package com.RealTimeCollaboration.RealTime.controller.aiController;

import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.aiChatRequest;
import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.aiChatResponse;
import com.RealTimeCollaboration.RealTime.service.aiService.aiAgentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class aiController {
    private final aiAgentService aiAgentService;

    @PostMapping("/chat")
    public ResponseEntity<aiChatResponse> chat(@RequestBody aiChatRequest request)
    {
        String answer = aiAgentService.chat(request);
        aiChatResponse response = new aiChatResponse();
        response.setAnswer(answer);

        return ResponseEntity.ok(response);
    }

}
