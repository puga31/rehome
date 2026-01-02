package com.rehome.backend.controller;

import com.rehome.backend.model.Product;
import com.rehome.backend.model.User;
import com.rehome.backend.repository.ProductRepository;
import com.rehome.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // GET /products -> todos los productos
    // Soporta filtros opcionales por categoría y condition
    @GetMapping
    public List<Product> getAllProducts(@RequestParam(required = false) String category,
                                        @RequestParam(required = false) String condition) {
        if (category != null && condition != null) {
            return productRepository.findByCategoryAndCondition(category, condition);
        } else if (category != null) {
            return productRepository.findByCategory(category);
        } else if (condition != null) {
            return productRepository.findByCondition(condition);
        } else {
            return productRepository.findAll();
        }
    }

    // GET /products/{id} -> producto por id
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /products?userId=1 -> crear producto asociado a un usuario
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product, @RequestParam Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        product.setUser(user);
        product.setPublishedAt(LocalDateTime.now());
        return ResponseEntity.ok(productRepository.save(product));
    }

    // PUT /products/{id} -> actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setCategory(updatedProduct.getCategory());
        product.setCondition(updatedProduct.getCondition());
        product.setPrice(updatedProduct.getPrice());
        product.setImageUrl(updatedProduct.getImageUrl());

        return ResponseEntity.ok(productRepository.save(product));
    }

    // DELETE /products/{id} -> borrar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
