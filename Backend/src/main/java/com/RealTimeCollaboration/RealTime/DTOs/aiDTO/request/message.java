package com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class message {

    private String role;

    private String content;

}