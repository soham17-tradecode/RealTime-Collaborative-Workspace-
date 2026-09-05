package com.RealTimeCollaboration.RealTime.DTOs.codeExecution;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class codeExecutionRequest {

    private String executionId;
    private String language;
    private String fileName;
    private String code;
    private String input;


}
