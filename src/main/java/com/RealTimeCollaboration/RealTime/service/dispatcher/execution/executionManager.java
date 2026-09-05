package com.RealTimeCollaboration.RealTime.service.dispatcher.execution;

import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionRequest;
import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionResponse;
import com.RealTimeCollaboration.RealTime.service.dispatcher.codeExecutionDispatcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
@Service
@RequiredArgsConstructor
public class executionManager {

    private final codeExecutionDispatcher dispatcher;
    private final executionResultService executionResultService;
    private final ExecutorService executorService =
            Executors.newCachedThreadPool();

    public void submit(String executionId,
                       codeExecutionRequest request) {

        executorService.submit(() -> {

            System.out.println("===== ExecutionManager Started =====");
            System.out.println("Execution ID = " + executionId);
            System.out.println("Language = " + request.getLanguage());

            try {

                codeExecutionResponse response = dispatcher.execute(request);

                System.out.println("===== Execution Finished =====");
                System.out.println("Saving Result : " + executionId);
                System.out.println("Dispatcher returned.");
                System.out.println(response);

                executionResultService.save(executionId, response);

            } catch (Exception e) {
                System.out.println("Dispatcher Exception");
                System.out.println("===== Execution Failed =====");
                e.printStackTrace();

                executionResultService.save(
                        executionId,
                        new codeExecutionResponse(
                                executionId,
                                "",
                                e.getMessage(),
                                -1,
                                0
                        )
                );
            }

        });

    }
}
