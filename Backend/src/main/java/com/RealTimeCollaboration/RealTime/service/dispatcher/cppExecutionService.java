package com.RealTimeCollaboration.RealTime.service.dispatcher;

import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionRequest;
import com.RealTimeCollaboration.RealTime.DTOs.codeExecution.codeExecutionResponse;
import com.RealTimeCollaboration.RealTime.service.dispatcher.util.commandResolver;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class cppExecutionService implements languageExecutor{

    private static final String TEMP_DIR = System.getProperty("java.io.tmpdir") + "/code-executor";
    private final runningProcessService runningProcessService;

    @Override
    public String language() {
        return "cpp";
    }

    @Override
    public codeExecutionResponse execute(codeExecutionRequest request) throws IOException {

        String executionId = request.getExecutionId();

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
                    new ProcessBuilder(
                            commandResolver.gpp(),
                            sourceFile.toString(),
                            "-o",
                            "main"
                    );

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



            ProcessBuilder runBuilder =
                    new ProcessBuilder(
                            "./main"
                    );

            runBuilder.directory(executionFolder.toFile());

            Process runProcess = runBuilder.start();
            runningProcessService.add(executionId, runProcess);
            if (request.getInput() != null &&
                    !request.getInput().isBlank()) {

                runProcess.getOutputStream()
                        .write((request.getInput() + System.lineSeparator()).getBytes());

                runProcess.getOutputStream().flush();

                runProcess.getOutputStream().close();

            }


            System.out.println("14. Waiting for Process...");

            try {

                runProcess.waitFor();

            } catch (InterruptedException e) {

                Thread.currentThread().interrupt();
                throw new RuntimeException(e);

            }

            System.out.println("15. Process Finished");

            int runExitCode = runProcess.exitValue();

            System.out.println("16. Process Exit Code = " + runExitCode);

            String output = readStream(runProcess.getInputStream());

            String error = readStream(runProcess.getErrorStream());

            long executionTime = System.currentTimeMillis() - startTime;

            System.out.println("17. Returning Response");

            return new codeExecutionResponse(
                    executionId,
                    output,
                    error,
                    runExitCode,
                    executionTime
            );

        } finally {

            System.out.println("18. Finally Block");

            runningProcessService.remove(executionId);

            System.out.println("19. Process Removed");

            deleteDirectory(executionFolder);

            System.out.println("20. Temp Folder Deleted");

            System.out.println("========================================");
            System.out.println("Execution Finished");
            System.out.println("========================================");
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
