package com.RealTimeCollaboration.RealTime.redis.roomRedis;

import com.RealTimeCollaboration.RealTime.model.createRoom.Room;
import com.RealTimeCollaboration.RealTime.model.registerUser;
import com.RealTimeCollaboration.RealTime.repo.userRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class createRoomRedis {
    private final StringRedisTemplate template;
    @Autowired
    userRepo userRepo;
    String roomId;

    public Room create(String roomName) {
      

        Room room = new Room();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();
        registerUser owner = userRepo.findByName(username);
        do {
            roomId = UUID.randomUUID().toString()
                    .replace("-", "")
                    .substring(0, 6)
                    .toUpperCase();

        } while (Boolean.TRUE.equals(template.hasKey("room: " + roomId)));


        room.setRoomCode(roomId);
        room.setOwner(owner);
        room.setRoomName(roomName);
        room.setCreatedAt(LocalDateTime.now());

        String key = "room: " + roomId;
        template.opsForHash().put(key, "roomId", roomId);


        template.opsForHash().put(key, "roomName", roomName);


        template.opsForHash().put(key, "ownerId", owner.getId().toString());
        template.opsForHash().put(key, "ownerName", owner.getName());


        return room;

    }

    public String joinRoom(String roomCode,String userID)
    {
        String roomKey = "room:"+roomCode+":members";
        if (Boolean.TRUE.equals(template.opsForSet().isMember(roomKey,userID)))
        {
            return "Already joined";
        }

        Long count = template.opsForSet().size(roomKey);
        if (count!=null && count>=3)
        {
            return "room is full";
        }
        template.opsForSet().add(roomKey,userID);
        return "joined";
    }


    public void leavesRoom(String roomCode ,String userId)
    {
        String memberKey = "room:"+roomCode+":members";
        template.opsForSet().remove(memberKey,userId);

        Long count = template.opsForSet().size(memberKey);

        if (count!=null && count.longValue() == 0)
        {
            template.delete(memberKey);
            template.delete( "room: " + roomCode);
        }


    }

    public Set<String> getMembers(String roomCode)
    {
        return  template.opsForSet().members("room:"+roomCode+":members");
    }

    public boolean roomExist(String roomCode)
    {
        return template.hasKey("room: " + roomCode);
    }

    public boolean member(String username ,String roomCode)
    {
        return Boolean.TRUE.equals(
                template.opsForSet().isMember(
                        "room:"+roomCode+":members",
                        username
                )
        );
    }

}
