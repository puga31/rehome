package com.rehome.backend.repository;

import com.rehome.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Buscar usuario por email
    User findByEmail(String email);
}
