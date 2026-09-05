package com.RealTimeCollaboration.RealTime.redis.roomRedis;

import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.presenceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.time.Duration;

@Service
public class presenceRedisService {

    @Autowired
    private StringRedisTemplate redisTemplate;
    private static final ObjectMapper mapper = new ObjectMapper();

    public String key(String roomCode,String userName)
    {
        return "presence:" + roomCode + ":" + userName;
    }

    public void save(presenceDto message)
    {
        try
        {
            String json = mapper.writeValueAsString(message);
            redisTemplate.opsForValue().set(key(message.getRoomCode(), message.getSender()),json, Duration.ofMinutes(30));

        }catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public presenceDto get(String roomCode,String userName)
    {
        try
        {
            String json = redisTemplate.opsForValue().get(key(roomCode,userName));
            if (json == null)
                return null;


            return mapper.readValue(json,presenceDto.class);



        }catch (Exception e)
        {
            return null;
        }
    }

    public void remove(String roomCode,String userName)
    {
        redisTemplate.delete(key(roomCode,userName));
    }
}
