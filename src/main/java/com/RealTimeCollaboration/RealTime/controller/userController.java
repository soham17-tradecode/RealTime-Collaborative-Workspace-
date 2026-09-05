package com.RealTimeCollaboration.RealTime.controller;

//import com.RealTimeCollaboration.RealTime.DTOs.login;

import com.RealTimeCollaboration.RealTime.JWt.jwtService;
import com.RealTimeCollaboration.RealTime.redis.refreshTokenServiceRedis;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.RealTimeCollaboration.RealTime.DTOs.Login;
import com.RealTimeCollaboration.RealTime.model.registerUser;
import com.RealTimeCollaboration.RealTime.repo.userRepo;

import java.time.Duration;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

@RestController
public class userController {

    @Autowired
    userRepo userRepo;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    refreshTokenServiceRedis refreshTokenServiceRedis;
    @Autowired
    jwtService jwtService;

    @PostMapping("/save")
    public String save(@Valid @RequestBody registerUser
                               user) {
        if (user.getPassword().equals(user.getCpassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepo.save(user);
        }

        System.out.println(user.getName());
        return "user saved ";

    }

//    @GetMapping("/g")
//    public String hg() {
//        return "welcome";
//    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login, HttpServletResponse response) {
        System.out.println("LOGIN API HIT");
        registerUser username = userRepo.findByName(login.getUsername());
        String name = username.getName();
        String token = "";
        if (name != null && name.equals(login.getUsername())) {
            token = jwtService.generateKey(username.getName());
        }
        if (!name.equals(login.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("username not found");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));

        String refreshToken = UUID.randomUUID().toString();


//         System.out.println(name);
//         System.out.println(token);

        refreshTokenServiceRedis.saveRefreshToken(login.getUsername(), refreshToken);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(5))
                .sameSite("Strict")
                .build();

        ResponseCookie accessToken = ResponseCookie.from("accessToken", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(5))
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        response.addHeader(HttpHeaders.SET_COOKIE, accessToken.toString());
        return ResponseEntity.ok("login successfully");


    }

    @PostMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        System.out.println("ME API HIT");
        System.out.println(authentication);
        return ResponseEntity.ok(Map.of("username", authentication.getName()));

    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            Authentication authentication

    ) {
        System.out.println(authentication);
        System.out.println("LOGOUT API HIT");

        ResponseCookie access =
                ResponseCookie
                        .from(
                                "accessToken",
                                ""
                        )
                        .path("/")
                        .maxAge(0)
                        .httpOnly(true)
                        .secure(false)
                        .sameSite("Lax")
                        .build();

        ResponseCookie refresh =
                ResponseCookie
                        .from(
                                "refreshToken",
                                ""
                        )
                        .path("/")
                        .maxAge(0)
                        .httpOnly(true)
                        .secure(false)
                        .sameSite("Lax")
                        .build();

//        response.addHeader(
//                HttpHeaders.SET_COOKIE,
//                access.toString()
//        );
//
//        response.addHeader(
//
//        );

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,
                        access.toString())
                .header(HttpHeaders.SET_COOKIE,
                        refresh.toString())
                .body("logged out");
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request) {
        System.out.println("REFRESH API HIT");

        Cookie[] cookies = request.getCookies();

        System.out.println("Cookies: " + Arrays.toString(cookies));

        String refreshToken = null;

        if (cookies != null) {
            System.out.println("NO COOKIES RECEIVED");

            for (Cookie cookie : cookies) {

                System.out.println(cookie.getName() + " = " + cookie.getValue());

                if (cookie.getName().equals("refreshToken")) {

                    refreshToken = cookie.getValue();
                }
            }
        }

//        System.out.println("Refresh Token: " + refreshToken);

        if (refreshToken == null) {
            System.out.println("FAIL: refreshToken is null");

            return ResponseEntity.status(401)
                    .body("no refresh Token");
        }
        refreshToken =
                refreshToken
                        .trim()
                        .replace("\"", "");

        String username =
                refreshTokenServiceRedis.getUserNameFromRedis(refreshToken);

        System.out.println("Username From Redis: " + username);

        if(username == null) {
            System.out.println("FAIL: username is null");

            return ResponseEntity
                    .status(401)
                    .body("Invalid Refresh Token");
        }

        String storedToken =
                refreshTokenServiceRedis.getRefreshToken(username);

//        System.out.println("Stored Token: " + storedToken);

        if (!refreshToken.equals(storedToken)) {
            System.out.println("FAIL: token mismatch");

            return ResponseEntity
                    .status(401)
                    .body("Invalid refresh token");
        }

        String accessToken =
                jwtService.generateKey(username);

        ResponseCookie accessCookie = ResponseCookie.from("accessToken",accessToken)
                .httpOnly(true)
                .path("/")
                .maxAge(15*60)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,accessCookie.toString())
                .body("Refreshed");
    }

}
