package com.RealTimeCollaboration.RealTime.service.codeExecutionService;

import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionRequest;
import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class codeExecutionServiceImpl implements codeExecutionService {

    private static final String TEMP_DIR = System.getProperty("java.io.tmpdir") + "/code-executor";

    @Override
    public codeExecutionResponse execute(codeExecutionRequest request) throws IOException {

        String executionId = UUID.randomUUID().toString();
        Path executionFolder = Paths.get(TEMP_DIR, executionId);

        Files.createDirectories(executionFolder);

        long startTime = System.currentTimeMillis();

        try {

            // =========================
            // Write Source File
            // =========================

            Path sourceFile = executionFolder.resolve(request.getFileName());

            Files.writeString(
                    sourceFile,
                    request.getCode(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING
            );

            // =========================
            // Compile
            // =========================

            ProcessBuilder compileBuilder =
                    new ProcessBuilder("javac", sourceFile.toString());

            compileBuilder.directory(executionFolder.toFile());

            Process compileProcess = compileBuilder.start();

            int compileExitCode;

            try {
                compileExitCode = compileProcess.waitFor();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }

            String compilerOutput = readStream(compileProcess.getInputStream());
            String compilerError = readStream(compileProcess.getErrorStream());

            if (compileExitCode != 0) {

                return new codeExecutionResponse(
                        executionId,
                        compilerOutput,
                        compilerError,
                        compileExitCode,
                        System.currentTimeMillis() - startTime
                );

            }

            // =========================
            // Execute
            // =========================

            String className = request.getFileName().replace(".java", "");

            ProcessBuilder runBuilder =
                    new ProcessBuilder("java", className);

            runBuilder.directory(executionFolder.toFile());

            Process runProcess = runBuilder.start();
            if (request.getInput() != null &&
                    !request.getInput().isBlank()) {

                runProcess.getOutputStream()
                        .write(request.getInput().getBytes());

                runProcess.getOutputStream().flush();

                runProcess.getOutputStream().close();

            }

            boolean finished;

            try {

                finished = runProcess.waitFor(5, TimeUnit.SECONDS);

            } catch (InterruptedException e) {

                Thread.currentThread().interrupt();
                throw new RuntimeException(e);

            }

            if (!finished) {

                runProcess.destroyForcibly();

                return new codeExecutionResponse(
                        executionId,
                        "",
                        "Execution Timeout (5 seconds)",
                        -1,
                        System.currentTimeMillis() - startTime
                );

            }

            int runExitCode = runProcess.exitValue();

            String output = readStream(runProcess.getInputStream());

            String error = readStream(runProcess.getErrorStream());

            long executionTime = System.currentTimeMillis() - startTime;

            return new codeExecutionResponse(
                    executionId,
                    output,
                    error,
                    runExitCode,
                    executionTime
            );

        } finally {

            deleteDirectory(executionFolder);

        }
    }

    private String readStream(InputStream inputStream) throws IOException {
        return new String(inputStream.readAllBytes());
    }

    private void deleteDirectory(Path path) throws IOException {

        if (!Files.exists(path)) {
            return;
        }

        Files.walk(path)
                .sorted((a, b) -> b.compareTo(a))
                .forEach(file -> {
                    try {
                        Files.deleteIfExists(file);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
    }
}
