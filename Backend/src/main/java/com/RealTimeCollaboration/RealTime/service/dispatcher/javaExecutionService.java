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
public class javaExecutionService implements languageExecutor {

    private static final String TEMP_DIR = System.getProperty("java.io.tmpdir") + "/code-executor";
    private final runningProcessService runningProcessService;

    @Override
    public String language() {
        return "java";
    }

    @Override
    public codeExecutionResponse execute(codeExecutionRequest request) throws IOException {

        System.out.println("========================================");
        System.out.println("1. Enter execute()");
        System.out.println("========================================");

        String executionId = request.getExecutionId();

        System.out.println("2. Execution ID = " + executionId);

        Path executionFolder = Paths.get(TEMP_DIR, executionId);

        Files.createDirectories(executionFolder);

        long startTime = System.currentTimeMillis();

        try {

            // =========================
            // Write Source File
            // =========================

            System.out.println("3. Creating source file...");

            Path sourceFile = executionFolder.resolve(request.getFileName());

            Files.writeString(
                    sourceFile,
                    request.getCode(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING
            );

            System.out.println("4. Source file created");

            // =========================
            // Compile
            // =========================

            System.out.println("5. Preparing compiler...");

            ProcessBuilder compileBuilder =
                    new ProcessBuilder(
                            commandResolver.javac(),
                            sourceFile.toString()
                    );

            compileBuilder.directory(executionFolder.toFile());

            System.out.println("6. Starting compilation...");

            Process compileProcess = compileBuilder.start();

            int compileExitCode;

            try {
                compileExitCode = compileProcess.waitFor();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }

            System.out.println("7. Compilation finished");
            System.out.println("Compile Exit Code = " + compileExitCode);

            String compilerOutput = readStream(compileProcess.getInputStream());
            String compilerError = readStream(compileProcess.getErrorStream());

            if (compileExitCode != 0) {

                System.out.println("8. Compilation Failed");

                return new codeExecutionResponse(
                        executionId,
                        compilerOutput,
                        compilerError,
                        compileExitCode,
                        System.currentTimeMillis() - startTime
                );

            }

            System.out.println("9. Compilation Successful");

            // =========================
            // Execute
            // =========================

            String className = request.getFileName().replace(".java", "");

            ProcessBuilder runBuilder =
                    new ProcessBuilder(
                            commandResolver.java(),
                            className
                    );

            runBuilder.directory(executionFolder.toFile());

            System.out.println("10. Starting Java Process...");

            Process runProcess = runBuilder.start();

            System.out.println("11. Java Process Started");

            runningProcessService.add(executionId, runProcess);

            System.out.println("12. Process Registered in runningProcessService");

            if (request.getInput() != null &&
                    !request.getInput().isBlank()) {

                System.out.println("13. Sending Standard Input");

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

        }finally {

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
