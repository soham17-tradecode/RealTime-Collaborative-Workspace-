package com.RealTimeCollaboration.RealTime.repo.createRoomRepo;

import com.RealTimeCollaboration.RealTime.model.createRoom.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface roomRepo extends JpaRepository<Room,Long> {

//    Optional<Room> findByRoomCode(String roomCode);
}
