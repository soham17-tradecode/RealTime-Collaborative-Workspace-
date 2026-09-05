package com.RealTimeCollaboration.RealTime.JWt;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class jwtService {
    private String secretKey = "";
    public jwtService()
    {
        try{

            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey key= keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(key.getEncoded());
        }catch (NoSuchAlgorithmException e)
        {
            throw new RuntimeException();
        }
    }

    public String generateKey(String username)
    {
        Map<String , Objects> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis()+1000*60*2))
                .and()
                .signWith(getKey())
                .compact();
    }
    public SecretKey getKey()
    {
        byte [] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean isTokenExpired(String token)
    {
        Date expiration = Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
        return expiration.before(new Date());
    }

    public String extractUsername(String token)
    {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean isValid(String token)
    {
        try
        {
            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);
            return true;

        }catch (Exception e)
        {
            return false;
        }
    }
    public boolean validateToken(String token, UserDetails userDetails)
    {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

}
