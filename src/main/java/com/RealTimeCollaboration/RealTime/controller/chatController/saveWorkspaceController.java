package com.RealTimeCollaboration.RealTime.controller.chatController;

//import com.RealTimeCollaboration.RealTime.DTOs
import com.RealTimeCollaboration.RealTime.DTOs.chatMessageDTO.workspaceStateDto;
import com.RealTimeCollaboration.RealTime.redis.roomRedis.workSpaceStateService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/workspace")
@RequiredArgsConstructor
public class saveWorkspaceController {

    private final workSpaceStateService service;

    @PostMapping("/state")
    public void save(
            @RequestBody workspaceStateDto dto,
            Authentication authentication) {

        service.save(
                dto.getRoomCode(),
                authentication.getName(),
                dto
        );
    }

    @GetMapping("/state/{roomCode}")
    public workspaceStateDto load(
            @PathVariable String roomCode,
            Authentication authentication) {

        workspaceStateDto dto = service.load(
                roomCode,
                authentication.getName()
        );

        if (dto == null) {
            return new workspaceStateDto(
                    roomCode,
                    null,
                    new ArrayList<>()
            );
        }

        return dto;
    }
}
