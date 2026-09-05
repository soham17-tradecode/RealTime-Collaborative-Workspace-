package com.RealTimeCollaboration.RealTime.service.dispatcher;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;

@Service
public class runningProcessService {

    private final ConcurrentHashMap<String, Process> runningProcess = new ConcurrentHashMap<>();

    public void add(String executionId, Process process) {

        System.out.println("ADD -> " + executionId);

        runningProcess.put(executionId, process);

        System.out.println("Current Map = " + runningProcess.keySet());
    }

    public void remove(String executionId) {

        System.out.println("REMOVE -> " + executionId);

        runningProcess.remove(executionId);

        System.out.println("Current Map = " + runningProcess.keySet());
    }

    public boolean stop(String executionId) {

        System.out.println("STOP -> " + executionId);

        System.out.println("Current Map = " + runningProcess.keySet());

        Process process = runningProcess.get(executionId);

        if (process == null) {
            return false;
        }

        process.destroyForcibly();

        try {
            process.waitFor();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        runningProcess.remove(executionId);

        System.out.println("PROCESS DESTROYED");

        return true;
    }
}
