package com.RealTimeCollaboration.RealTime.service.dispatcher.execution;

import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class executionResultService {



    private final ConcurrentHashMap<String, codeExecutionResponse> results =
            new ConcurrentHashMap<>();


    public void save(String executionId,
                     codeExecutionResponse response) {

        results.put(executionId, response);

    }


    public codeExecutionResponse get(String executionId) {

        return results.get(executionId);

    }

    public void remove(String executionId) {

        results.remove(executionId);

    }

}
