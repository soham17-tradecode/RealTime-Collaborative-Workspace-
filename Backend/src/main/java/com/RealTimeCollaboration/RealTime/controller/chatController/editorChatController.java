package com.RealTimeCollaboration.RealTime.controller.chatController;

import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.cursorMessage;
import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.editorMessage;
import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.presenceDto;
import com.RealTimeCollaboration.RealTime.redis.roomRedis.presenceRedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller

public class editorChatController {
    @Autowired
    private presenceRedisService redisService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/editor.change")
    public void editor(editorMessage editorMessage)
    {
        messagingTemplate.convertAndSend("/topic/editor/"+editorMessage.getRoomCode()+"/"+editorMessage.getFileName(),editorMessage);
    }

    @MessageMapping("/cursor")
    public void cursor(cursorMessage message)
    {
        messagingTemplate.convertAndSend("/topic/cursor/"+message.getRoomCode()+"/"+message.getFileName(),message);

    }
    @MessageMapping("/presence")
    public void presence(presenceDto dto){
        redisService.save(dto);

        messagingTemplate.convertAndSend(
                "/topic/presences/" + dto.getRoomCode(),
                dto
        );

    }
}
