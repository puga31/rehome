package com.rehome.backend.controller;

import com.rehome.backend.model.User;
import com.rehome.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Esta clase maneja las rutas HTTP relacionadas con usuarios
@RestController
@RequestMapping("/users")

public class UserController {
    private final UserRepository userRepository;

    // Inyección de dependencia del repositorio
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Ruta GET para obtener todos los usuarios
    @GetMapping("/getall")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Ruta POST para crear un usuario
    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
