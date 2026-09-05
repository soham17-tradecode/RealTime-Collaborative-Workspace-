package com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class groqRequest {

    private String model;

    private List<message> messages;

}