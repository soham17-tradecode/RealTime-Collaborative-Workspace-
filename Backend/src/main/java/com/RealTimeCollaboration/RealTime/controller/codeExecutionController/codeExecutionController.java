package com.RealTimeCollaboration.RealTime.controller.codeExecutionController;

import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionRequest;
import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionResponse;
import com.RealTimeCollaboration.RealTime.service.dispatcher.execution.executionManager;
import com.RealTimeCollaboration.RealTime.service.dispatcher.execution.executionResultService;
import com.RealTimeCollaboration.RealTime.service.dispatcher.runningProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/run")
@RequiredArgsConstructor
public class codeExecutionController {

    private final executionManager executionManager;
    private final runningProcessService runningProcessService;
    private final executionResultService resultService;

    @PostMapping
    public ResponseEntity<String> executionResponseResponseEntity(
            @RequestBody codeExecutionRequest request
    ) {

        String executionId = UUID.randomUUID().toString();

        request.setExecutionId(executionId);

        executionManager.submit(executionId, request);

        return ResponseEntity.ok(executionId);
    }
    @PostMapping("/stop/{executionId}")
    public ResponseEntity<String>stopExe(@PathVariable String executionId)
    {
        boolean stopped = runningProcessService.stop(executionId);
        if (stopped)
        {
            return ResponseEntity.ok("Execution stopped successfully");
        }
        return ResponseEntity.badRequest().body("Execution not found");
    }
    @GetMapping("/result/{executionId}")
    public ResponseEntity<?> getResult(
            @PathVariable String executionId
    ) {

        codeExecutionResponse response =
                resultService.get(executionId);

        if (response == null) {

            return ResponseEntity.accepted()
                    .body("Still Running");

        }

        resultService.remove(executionId);

        return ResponseEntity.ok(response);

    }
}
