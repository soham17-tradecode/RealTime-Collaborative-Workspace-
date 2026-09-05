package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import lombok.Data;

@Data
public class chatMessage {
    private String roomCode;
    private String sender;
    private String content;
}
