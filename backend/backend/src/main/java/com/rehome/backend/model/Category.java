package com.rehome.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Salón, Dormitorio, Comedor, Cocina, Baño, Jardín

    public Category() {} // Constructor vacío obligatorio para JPA

    public Category(String name) {
        this.name = name;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
