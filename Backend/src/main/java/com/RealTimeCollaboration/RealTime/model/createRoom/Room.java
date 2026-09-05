package com.RealTimeCollaboration.RealTime.model.createRoom;

import com.RealTimeCollaboration.RealTime.model.registerUser;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Table (name = "Room")
@Entity
public class Room {

    @Id
    @GeneratedValue
    private Long id;

    private String roomCode;
    private String roomName;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private registerUser owner;

    private LocalDateTime createdAt;


}
