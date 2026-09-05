package com.RealTimeCollaboration.RealTime.controller.chatController;

import com.RealTimeCollaboration.RealTime.service.activity.activityService;
import jakarta.annotation.security.PermitAll;
import jakarta.persistence.GeneratedValue;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
public class activityController {


    private final activityService activityService;

    @GetMapping("/{roomCode}")
    public ResponseEntity<?> history(@PathVariable String roomCode)
    {
       return ResponseEntity.ok(activityService.history(roomCode));
    }
}
