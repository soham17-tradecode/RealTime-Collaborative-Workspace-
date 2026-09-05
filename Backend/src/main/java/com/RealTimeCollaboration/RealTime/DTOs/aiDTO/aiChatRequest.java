package com.RealTimeCollaboration.RealTime.DTOs.aiDTO;

import lombok.Data;

@Data
public class aiChatRequest {
    private String prompt;
    private String language;
    private String currentFile;
    private String selectCode;
    private String roomCode;

}
