package com.RealTimeCollaboration.RealTime.service;

import com.RealTimeCollaboration.RealTime.model.registerUser;
import com.RealTimeCollaboration.RealTime.repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class userDetailsService implements UserDetailsService {
    @Autowired
    userRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        registerUser user = userRepo.findByName(username);

        if (user==null)
        {
            throw new UsernameNotFoundException("username not found");
        }
        return User.builder()
                .username(user.getName())
                .password(user.getPassword())
                .build();

    }
}
