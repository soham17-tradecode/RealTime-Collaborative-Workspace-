package com.RealTimeCollaboration.RealTime.service.dispatcher.util;

public class commandResolver {
    private commandResolver() {
    }

    private static final boolean WINDOWS =
            System.getProperty("os.name")
                    .toLowerCase()
                    .contains("win");

    public static String python() {
        return WINDOWS ? "py" : "python3";
    }

    public static String java() {
        return "java";
    }

    public static String javac() {
        return "javac";
    }

    public static String gcc() {
        return WINDOWS ? "gcc.exe" : "gcc";
    }

    public static String gpp() {
        return WINDOWS ? "g++.exe" : "g++";
    }

    public static String node() {
        return WINDOWS ? "node.exe" : "node";
    }
    public static String cppExecutable() {
        return "./main";
    }

    public static String cExecutable() {
        return "./main";
    }
}
