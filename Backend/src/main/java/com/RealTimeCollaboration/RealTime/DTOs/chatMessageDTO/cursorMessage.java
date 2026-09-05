package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import lombok.Data;

@Data
public class cursorMessage {
    private String roomCode;
    private String fileName;
    private String sender;

    private  int line;
    private  int column;
}
