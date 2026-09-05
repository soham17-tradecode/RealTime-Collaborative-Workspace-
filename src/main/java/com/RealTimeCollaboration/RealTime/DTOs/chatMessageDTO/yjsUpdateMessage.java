package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import lombok.Data;
import org.springframework.data.redis.connection.stream.StreamInfo;

@Data
public class yjsUpdateMessage {
    private String roomCode;
    private String fileName;
    private String sender;
    private String update;
}
