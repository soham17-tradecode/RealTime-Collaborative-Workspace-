package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class editorMessage {

    private String roomCode;

    private String content;
    private String fileName;
    private String sender;

}
