package com.RealTimeCollaboration.RealTime.redis.roomRedis;

//import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.WorkspaceStateDto;
import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.workspaceStateDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class workSpaceStateService {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private String getKey(String roomCode, String username) {
        return "workspace:" + roomCode + ":" + username;
    }

    public void save(String roomCode,
                     String username,
                     workspaceStateDto dto) {

        try {
            String json = objectMapper.writeValueAsString(dto);

            redisTemplate.opsForValue().set(
                    getKey(roomCode, username),
                    json
            );

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Unable to save workspace", e);
        }
    }

    public workspaceStateDto load(String roomCode,
                                  String username) {

        try {

            String json = redisTemplate
                    .opsForValue()
                    .get(getKey(roomCode, username));

            if (json == null) {
                return null;
            }

            return objectMapper.readValue(
                    json,
                    workspaceStateDto.class
            );

        } catch (Exception e) {
            throw new RuntimeException("Unable to load workspace", e);
        }
    }
}