package com.rehome.backend.repository;

import com.rehome.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(String category);

    List<Product> findByCondition(String condition);

    List<Product> findByCategoryAndCondition(String category, String condition);
}
