package com.RealTimeCollaboration.RealTime.controller.fileController;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class fileRequestDtos {
    @NotBlank
    private String fileName;
}
