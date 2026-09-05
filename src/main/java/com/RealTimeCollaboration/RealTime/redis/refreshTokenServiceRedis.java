package com.RealTimeCollaboration.RealTime.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class refreshTokenServiceRedis {
    private final StringRedisTemplate template;

    public void saveRefreshToken(String username,String refreshToken)
    {
        template.opsForValue().set(username,refreshToken, Duration.ofDays(3));
        template.opsForValue().set(refreshToken,username, Duration.ofDays(3));
    }

    public String getRefreshToken(String username)
    {
        return template.opsForValue().get(username);
    }
    public void blackListToken(String token)
    {
        template.opsForValue().set("blackList :"+token,"blacklisted: ",Duration.ofMinutes(15));

    }
    public boolean isBlackListed(String token)
    {
        return Boolean.TRUE.equals(template.hasKey(token));
    }
    public String getUserNameFromRedis(String refreshToken)
    {
        return template.opsForValue().get(refreshToken);
    }

}
