package com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class content {

    private List<part> parts;

}