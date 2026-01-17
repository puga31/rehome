package com.rehome.backend.controller;

import com.rehome.backend.dto.UserDTO;
import com.rehome.backend.model.User;
import com.rehome.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🔐 LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {

        Optional<User> userOpt = userRepository.findByEmail(userDTO.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Usuario no encontrado");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(userDTO.getPassword())) {
            return ResponseEntity.status(401).body("Contraseña incorrecta");
        }

        // ✅ devolver solo datos seguros
        UserDTO response = new UserDTO();
        response.setName(user.getName());
        response.setEmail(user.getEmail());

        return ResponseEntity.ok(response);
    }

    // 📝 REGISTRO
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO userDTO) {

        Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());

        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está registrado");
        }

        User user = new User(
                userDTO.getEmail(),
                userDTO.getPassword(), // 🔴 luego BCrypt
                userDTO.getName()
        );

        userRepository.save(user);

        // devolver sin password
        UserDTO response = new UserDTO();
        response.setName(user.getName());
        response.setEmail(user.getEmail());

        return ResponseEntity.ok(response);
    }
}
