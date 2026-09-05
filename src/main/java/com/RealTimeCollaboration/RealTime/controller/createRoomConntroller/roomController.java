package com.RealTimeCollaboration.RealTime.controller.createRoomConntroller;

import com.RealTimeCollaboration.RealTime.DTOs.JoinRoomDTOs.joinRoomDTO;
import com.RealTimeCollaboration.RealTime.DTOs.createRoomDTos.createRoomRequest;
import com.RealTimeCollaboration.RealTime.model.createRoom.Room;
//import com.RealTimeCollaboration.RealTime.model.createRoom.user;
import com.RealTimeCollaboration.RealTime.redis.roomRedis.createRoomRedis;
import com.RealTimeCollaboration.RealTime.service.activity.activityService;
import com.RealTimeCollaboration.RealTime.service.createRoomService.roomService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class roomController {

    @Autowired
    roomService roomService;


    @Autowired
    activityService activityService;

    @Autowired
    createRoomRedis createRoomRedis;


    @PostMapping("/room")
    public ResponseEntity<?> createRoom(@RequestBody createRoomRequest request)
    {


        Room room = createRoomRedis.create(request.getRoomName());
        System.out.println(room.getRoomCode());


        return ResponseEntity.ok(room);



    }

    @PostMapping("/joinRoom")
    public ResponseEntity<?> joinRoom(@RequestBody joinRoomDTO joinRoomDTO, Authentication authentication)
    {
        String userId = authentication.getName();
        String join = createRoomRedis.joinRoom(joinRoomDTO.getRoomCode(),userId);
        if ("joined".equals(join))
        {
             activityService.record(joinRoomDTO.getRoomCode(),userId,"JOIN_ROOM"," ");
            return ResponseEntity.ok(join);
        }


        return ResponseEntity.badRequest().body(join);
    }

    @GetMapping("/{roomCode}/members")
    public ResponseEntity<?> getMembers(@PathVariable String roomCode)
    {
        return  ResponseEntity.ok(createRoomRedis.getMembers(roomCode));
    }

    @GetMapping("/roomCode/{roomCode}/validated")
    public ResponseEntity<?> validates(@PathVariable String roomCode,Authentication authentication)
    {
        String username = authentication.getName();
        boolean exists = createRoomRedis.roomExist(roomCode);
        if (!exists)
        {
            return ResponseEntity.status(404)
                    .body("Room not found");
        }


        boolean isMember = createRoomRedis.member(username,roomCode);
        if (!isMember)
        {
            return ResponseEntity.status(403)
                    .body("Access denied");
        }


//        return  ResponseEntity.ok(Map.of("exists",true,"isMember",true));

        return ResponseEntity.ok("Valid room");
    }


}
