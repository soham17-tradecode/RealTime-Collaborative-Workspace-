package com.RealTimeCollaboration.RealTime.DTOs.fileDTOs;

import lombok.Data;

@Data
public class uploadInItRequest {

    private Integer totalChunks;
    private Long fileSize;
    private String fileName;
    private String roomCode;
}
