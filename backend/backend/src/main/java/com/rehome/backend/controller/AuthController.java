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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {

        Optional<User> userOpt = userRepository.findByEmail(userDTO.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Usuario no encontrado");
        }

        User user = userOpt.get();

        // 🔐 Login con contraseña
        if (!user.getPassword().equals(userDTO.getPassword())) {
            return ResponseEntity.status(401).body("Contraseña incorrecta");
        }

        // ✅ Login correcto (no devolver password)
        UserDTO response = new UserDTO();
        response.setName(user.getName());
        response.setEmail(user.getEmail());

        return ResponseEntity.ok(response);
    }
}
