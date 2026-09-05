package com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table (name = "workspace")
public class workSpaceActivityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomCode;
    private String username;
    private String action;
    private String target;

    private LocalDateTime createdAt;
}
