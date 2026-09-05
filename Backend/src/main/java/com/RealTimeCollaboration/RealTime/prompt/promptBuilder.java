package com.RealTimeCollaboration.RealTime.prompt;

import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.aiChatRequest;
import org.springframework.stereotype.Component;

@Component
public class promptBuilder {
    public String buildPrompt(aiChatRequest request)
    {
        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                You are an expert software engineer and AI coding assistant.

                Your responsibilities:
                - Answer programming questions.
                - Explain code clearly.
                - Find bugs.
                - Suggest improvements.
                - Generate production-ready code.
                - Never invent APIs.
                - If information is missing, clearly say so.

                """);

        prompt.append("Programming language:\n");
        prompt.append(request.getLanguage()).append("\n\n");


        prompt.append("current file:\n");
        prompt.append(request.getCurrentFile()).append("\n\n");

        if (request.getSelectCode()!=null&& !request.getSelectCode().isBlank())
        {
            prompt.append("""
                    Selected Code:
                    ------------------------
                    """);

            prompt.append(request.getSelectCode());

            prompt.append("\n------------------------\n\n");

        }
        prompt.append("User Question:\n");
        prompt.append(request.getPrompt());
        return prompt.toString();
    }
}
