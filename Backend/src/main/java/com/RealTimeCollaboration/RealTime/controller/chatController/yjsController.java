package com.RealTimeCollaboration.RealTime.controller.chatController;

import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.yjsUpdateMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class yjsController {
    private final SimpMessagingTemplate template;


    @MessageMapping("/yjs.sync")
    public void sync(yjsUpdateMessage message, Principal principal)
    {
        message.setSender(principal.getName());
        template.convertAndSend("/topic/editor/"+message.getRoomCode()+"/"+message.getFileName(),message);

    }
}
