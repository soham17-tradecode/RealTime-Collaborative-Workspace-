package com.RealTimeCollaboration.RealTime.DTOs.aiDTO.response;

import lombok.Data;
import java.util.List;

@Data
public class groqResponse {

    private List<choice> choices;

}