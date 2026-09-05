package com.RealTimeCollaboration.RealTime.controller.chatController;

import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.presenceDto;
import com.RealTimeCollaboration.RealTime.redis.roomRedis.createRoomRedis;
import com.RealTimeCollaboration.RealTime.redis.roomRedis.presenceRedisService;
import com.RealTimeCollaboration.RealTime.service.createRoomService.roomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/presence")
public class presenceRestController {
    @Autowired
    private presenceRedisService  presenceRedisService;

    @Autowired
    private createRoomRedis createRoomRedis;

    @GetMapping("/{roomCode}")
    public Map<String, presenceDto> getPresence(@PathVariable String roomCode)
    {
        Map<String,presenceDto> map = new HashMap<>();
        Set<String> members = createRoomRedis.getMembers(roomCode);
        for (String member:members)
        {
            presenceDto p = presenceRedisService.get(roomCode,member);
            if(p!=null)
            {
                map.put(member,p);
            }
        }
        return map;
    }
}
