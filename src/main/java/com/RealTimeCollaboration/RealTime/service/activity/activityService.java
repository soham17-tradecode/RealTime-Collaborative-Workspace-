package com.RealTimeCollaboration.RealTime.service.activity;

import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.activityDto;
import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.workSpaceActivityEntity;
import com.RealTimeCollaboration.RealTime.repo.chatMessage.workSpaceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class activityService {
    @Autowired
    private final workSpaceRepo repo;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void record(activityDto dto) {

        workSpaceActivityEntity activity = new workSpaceActivityEntity();

        activity.setRoomCode(dto.getRoomCode());
        activity.setUsername(dto.getUsername());
        activity.setAction(dto.getAction());
        activity.setTarget(dto.getTarget());
        activity.setCreatedAt(LocalDateTime.now());

        workSpaceActivityEntity savedActivity = repo.save(activity);

        messagingTemplate.convertAndSend(
                "/topic/activity/" + dto.getRoomCode(),
                savedActivity
        );
    }

    public List<workSpaceActivityEntity> history(String roomCode)
    {
        return repo.findByRoomCodeOrderByCreatedAtDesc(roomCode);
    }

    public void record(String roomCode,String username ,String action,String target)
    {
        activityDto dto = new activityDto();
        dto.setRoomCode(roomCode);
        dto.setUsername(username);
        dto.setAction(action);
        dto.setTarget(target);

        record(dto);

    }

}
