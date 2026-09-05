package com.RealTimeCollaboration.RealTime.DTOs.fileDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class fileEventDto {
    private String roomCode;
    private String event;
    private String fileName;
    private String sender;
    private String oldFileName;
}
