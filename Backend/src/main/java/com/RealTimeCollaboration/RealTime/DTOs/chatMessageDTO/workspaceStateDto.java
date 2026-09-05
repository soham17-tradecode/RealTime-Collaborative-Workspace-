package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class workspaceStateDto {
    private String roomCode;
    private String selectedFile;
    private List<String> openTabs;
}
