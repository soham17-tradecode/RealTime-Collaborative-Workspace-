package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class activityDto {

    private String roomCode;
    private String username;
    private String action;
    private String target;

    private LocalDateTime createdAt;
}
