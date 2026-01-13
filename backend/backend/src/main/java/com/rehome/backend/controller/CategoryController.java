package com.rehome.backend.controller;

import com.rehome.backend.model.Category;
import com.rehome.backend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*") // Permite que Angular haga peticiones desde otro puerto
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Endpoint para obtener todas las categorías
    @GetMapping("/getall")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
