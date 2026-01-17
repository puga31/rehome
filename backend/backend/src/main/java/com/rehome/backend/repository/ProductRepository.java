package com.rehome.backend.repository;

import com.rehome.backend.model.Product;
import com.rehome.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Filtrar por categoría
    List<Product> findByCategory(Category category);

    // Filtrar por condición (new/used)
    List<Product> findByCondition(String condition);

    // Filtrar por categoría y condición juntas
    List<Product> findByCategoryAndCondition(Category category, String condition);

    // Filtrar productos por usuario
    List<Product> findByUserId(Long userId);

    // NUEVO: últimos 20 productos
    List<Product> findTop20ByOrderByPublishedAtDesc();
}
