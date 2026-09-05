//package com.RealTimeCollaboration.RealTime.client;
//
//import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request.content;
//import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request.geminiRequest;
//import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.request.part;
//import com.RealTimeCollaboration.RealTime.DTOs.aiDTO.response.geminiResponse;
//import com.RealTimeCollaboration.RealTime.config.aiConfig.aiConfig;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestClient;
//import org.springframework.web.reactive.function.client.WebClient;
//
//import java.util.List;
//
//@Component
//public class geminiClient {
//    private final WebClient webClient;
//    private final aiConfig aiConfig;
//
//
//    public geminiClient( WebClient webClient, aiConfig aiConfig) {
//        this.webClient = webClient;
//
//        this.aiConfig = aiConfig;
//    }
//    public String chat(String prompt) {
//
//        geminiRequest request = new geminiRequest(
//                List.of(
//                        new content(
//                                List.of(
//                                        new part(prompt)
//                                )
//                        )
//                )
//        );
//
//        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
//                + aiConfig.getModel()
//                + ":generateContent";
//
//        System.out.println("=================================");
//        System.out.println("Model : " + aiConfig.getModel());
//        System.out.println("URL   : " + url);
//        System.out.println("=================================");
//        System.out.println(request);
//
//        String response = webClient.post()
//                .uri(url)
//                .header("x-goog-api-key", aiConfig.getApiKey())
//                .contentType(org.springframework.http.MediaType.APPLICATION_JSON)
//                .bodyValue(request)
//                .exchangeToMono(res -> {
//                    System.out.println("HTTP Status = " + res.statusCode());
//                    return res.bodyToMono(String.class);
//                })
//                .block();
//
//        System.out.println("RAW RESPONSE:");
//        System.out.println(response);
//
//        return response;
//    }
//}
