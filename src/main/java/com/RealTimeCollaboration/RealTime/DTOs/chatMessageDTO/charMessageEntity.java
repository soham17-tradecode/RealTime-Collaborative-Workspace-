package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Table (name = "chat")
@Entity
public class charMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomCode;
    private String sender;
    private String content;
    private String fileName;
    private String fileId;
    private String messageType;
    private LocalDateTime sendAt;


}
