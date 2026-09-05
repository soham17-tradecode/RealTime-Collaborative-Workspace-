package com.RealTimeCollaboration.RealTime.service.dispatcher;

import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionRequest;
import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class codeExecutionDispatcher {

    private final Map<String,languageExecutor> executorMap;


    public codeExecutionDispatcher(List< languageExecutor> executorList) {
        executorMap = executorList.stream()
                .collect(Collectors.toMap(languageExecutor::language, Function.identity()));
    }

    public codeExecutionResponse execute (codeExecutionRequest request) throws IOException {
        languageExecutor executor = executorMap.get(request.getLanguage().toLowerCase());
        if (executor == null)
        {
            throw new RuntimeException("Language not supported");

        }
        return executor.execute(request);
    }
}
