//package com.RealTimeCollaboration.RealTime.client;
//
////package com.RealTimeCollaboration.RealTime.client;
//
////import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request.GroqRequest;
////import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request.Message;
//import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request.groqRequest;
//import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request.message;
////import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.response.GroqResponse;
//import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.response.groqResponse;
////import com.RealTimeCollaboration.RealTime.config.aiConfig.GroqConfig;
//import com.RealTimeCollaboration.RealTime.config.aiConfig.groqConfig;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Component;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//import java.util.List;
//
//@Component
//public class groqClient implements llmClient {
//
//    private final WebClient webClient;
//    private final groqConfig groqConfig;
//
//    public groqClient(WebClient webClient, groqConfig groqConfig) {
//        this.webClient = webClient;
//        this.groqConfig = groqConfig;
//    }
//
//
//    @Override
//    public String chat(String prompt) {
//
//        groqRequest request = new groqRequest(
//                groqConfig.getModel(),
//                List.of(
//                        new message(
//                                "user",
//                                prompt
//                        )
//                )
//        );
//
//        groqResponse response = webClient.post()
//                .uri("https://api.groq.com/openai/v1/chat/completions")
//                .header("Authorization", "Bearer " + groqConfig.getApiKey())
//                .contentType(MediaType.APPLICATION_JSON)
//                .bodyValue(request)
//                .retrieve()
//                .onStatus(
//                        status -> status.isError(),
//                        clientResponse -> clientResponse
//                                .bodyToMono(String.class)
//                                .doOnNext(body ->
//                                        System.out.println("===== GROQ ERROR =====")
//                                )
//                                .doOnNext(System.out::println)
//                                .then(Mono.error(
//                                        new RuntimeException(
//                                                "Groq API returned: "
//                                                        + clientResponse.statusCode()
//                                        )
//                                ))
//                )
//                .bodyToMono(groqResponse.class)
//                .block();
//
//        if (response == null
//                || response.getChoices() == null
//                || response.getChoices().isEmpty()) {
//
//            return "No response from Groq.";
//        }
//
//        return response.getChoices()
//                .get(0)
//                .getMessage()
//                .getContent();
//    }
//}
