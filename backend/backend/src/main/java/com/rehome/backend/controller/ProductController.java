package com.rehome.backend.controller;

import com.rehome.backend.dto.ProductDTO;
import com.rehome.backend.model.Category;
import com.rehome.backend.model.Product;
import com.rehome.backend.model.User;
import com.rehome.backend.repository.CategoryRepository;
import com.rehome.backend.repository.ProductRepository;
import com.rehome.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*") // Para que Angular pueda hacer peticiones
public class ProductController {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ProductController(ProductRepository productRepository,
                             UserRepository userRepository,
                             CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    // Obtener todos los productos
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear producto
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
        // Buscar usuario
        User user = userRepository.findById(productDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + productDTO.getUserId()));

        // Buscar categoría
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id " + productDTO.getCategoryId()));

        // Crear producto
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);  // ✅ ahora correcto
        product.setCondition(productDTO.getCondition());
        product.setPrice(productDTO.getPrice());
        product.setImageUrl(productDTO.getImageUrl());
        product.setPublishedAt(LocalDateTime.now());
        product.setUser(user);

        return ResponseEntity.ok(productRepository.save(product));
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());

        // Actualizar categoría
        Category category = categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id " + productDTO.getCategoryId()));
        product.setCategory(category);

        product.setCondition(productDTO.getCondition());
        product.setPrice(productDTO.getPrice());
        product.setImageUrl(productDTO.getImageUrl());

        // Actualizar usuario si se proporciona
        if (productDTO.getUserId() != null) {
            User user = userRepository.findById(productDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id " + productDTO.getUserId()));
            product.setUser(user);
        }

        return ResponseEntity.ok(productRepository.save(product));
    }

    // Borrar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Listar productos por usuario
    @GetMapping("/user/{userId}")
    public List<Product> getProductsByUser(@PathVariable Long userId) {
        return productRepository.findByUserId(userId);
    }
}
