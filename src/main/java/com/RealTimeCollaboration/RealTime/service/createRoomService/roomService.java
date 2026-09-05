package com.RealTimeCollaboration.RealTime.service.createRoomService;

import com.RealTimeCollaboration.RealTime.DTOs.createRoomDTos.createRoomRequest;
import com.RealTimeCollaboration.RealTime.model.createRoom.Room;
//import com.RealTimeCollaboration.RealTime.model.createRoom.user;
import com.RealTimeCollaboration.RealTime.model.registerUser;
import com.RealTimeCollaboration.RealTime.repo.createRoomRepo.roomRepo;
//import com.RealTimeCollaboration.RealTime.repo.createRoomRepo.roomUserRepo;
import com.RealTimeCollaboration.RealTime.repo.userRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class roomService {


    @Autowired
    private roomRepo roomRepo;

    @Autowired
    userRepo userRepo;


    public Room createRoom(createRoomRequest request) {
        return null;
    }

//    public List<String> getMembers(String roomCode) {
//
//    }
}
