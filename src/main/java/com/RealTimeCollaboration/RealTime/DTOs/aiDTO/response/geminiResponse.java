package com.RealTimeCollaboration.RealTime.DTOs.aiDTO.response;

import lombok.Data;

import java.util.List;

@Data
public class geminiResponse {

    private List<candidate> candidates;

}
