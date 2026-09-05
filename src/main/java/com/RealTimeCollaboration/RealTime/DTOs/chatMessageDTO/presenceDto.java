package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import lombok.Data;

@Data
public class presenceDto {
    private String roomCode;
    private String sender;
    private String fileName;
    private String status;
}
