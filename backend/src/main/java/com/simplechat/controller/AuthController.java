package com.simplechat.controller;

import com.simplechat.model.User;
import com.simplechat.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    
    private final UserRepository userRepository;
    
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if(user.getUsername() == null || user.getPassword() == null) {
                return ResponseEntity.badRequest().body("Username et password requis");
            }
            
            if(userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username déjà utilisé");
            }
            
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body("Erreur lors de l'inscription: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        System.out.println("Tentative de connexion: " + user.getUsername());

        System.out.println("Reçu : username=" + user.getUsername() + ", password=" + user.getPassword());

        Optional<User> foundUser = userRepository.findByUsernameAndPassword(
            user.getUsername(), 
            user.getPassword()
        );
        
        System.out.println("Utilisateur trouvé: " + foundUser.isPresent());
        
        if (foundUser.isPresent()) {
            return ResponseEntity.ok(foundUser.get());
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Nom d'utilisateur ou mot de passe incorrect");
    }

}