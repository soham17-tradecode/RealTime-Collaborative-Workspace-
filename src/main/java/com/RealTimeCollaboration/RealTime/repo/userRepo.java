package com.RealTimeCollaboration.RealTime.repo;

//import com.RealTimeCollaboration.RealTime.model.createRoom.user;
import com.RealTimeCollaboration.RealTime.model.registerUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepo extends JpaRepository<registerUser,Integer> {

    registerUser findByName(String name);

}
