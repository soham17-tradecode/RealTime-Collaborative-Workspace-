package com.RealTimeCollaboration.RealTime.service.codeExecutionService;

import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionRequest;
import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface codeExecutionService {


    codeExecutionResponse execute(codeExecutionRequest  request) throws IOException;
}
