package com.simplechat.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String content;
    private LocalDateTime timestamp;
    
    @ManyToOne
    private User sender;
    
    @ManyToOne
    private User receiver;
}