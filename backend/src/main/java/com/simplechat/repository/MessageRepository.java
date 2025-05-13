package com.simplechat.repository;

import com.simplechat.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(
        Long senderId, Long receiverId, Long senderId2, Long receiverId2);
}