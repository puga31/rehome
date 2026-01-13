package com.rehome.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 100)
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "product_condition")
    private String condition; //New or Used

    private Double price; //puede ser null si es un regalo

    private LocalDateTime publishedAt;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Constructor vacío (OBLIGATORIO para JPA)
    public Product() {}

    //Constructor con parámetros

    public Product(String name, String description, Category category, String condition, Double price, LocalDateTime publishedAt, String imageUrl) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.condition = condition;
        this.price = price;
        this.publishedAt = publishedAt;
        this.imageUrl = imageUrl;
    }

    //Getters y Setters
    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}

    public Category getCategory() {return category;}
    public void setCategory(Category category) {this.category = category;}

    public String getCondition() {return condition;}
    public void setCondition(String condition) {this.condition = condition;}

    public Double getPrice() {return price;}
    public void setPrice(Double price) {this.price = price;}

    public LocalDateTime getPublishedAt() {return publishedAt;}
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }

    public String getImageUrl() {return imageUrl;}
    public void setImageUrl(String imageUrl) {this.imageUrl = imageUrl;}

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
