package com.rehome.backend.dto;

public class ProductDTO {

    private String name;
    private String description;
    private Long categoryId;
    private String condition; // New or Used
    private Double price;     // Puede ser null
    private String imageUrl;
    private Long userId;      // ID del usuario propietario (nuevo)

    public ProductDTO() {}

    public ProductDTO(String name, String description, Long categoryId, String condition, Double price, String imageUrl, Long userId) {
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.condition = condition;
        this.price = price;
        this.imageUrl = imageUrl;
        this.userId = userId;
    }

    // Getters y Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
