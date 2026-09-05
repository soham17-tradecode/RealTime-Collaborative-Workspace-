package com.RealTimeCollaboration.RealTime.DTOs.codeExecution;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class codeExecutionResponse {

    private String executionId;
    private String output;
    private String error;
    private int exitCode;
    private long executionTime;
}
