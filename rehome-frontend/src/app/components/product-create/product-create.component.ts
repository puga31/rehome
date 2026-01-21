import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // Producto inicial vacío
  product: Product = {
    id: 0, // temporal, el backend generará el real
    name: '',
    description: '',
    category: null, // categoría seleccionada
    condition: 'Used',
    price: 0,
    imageUrl: ''
  };

  categories: Category[] = []; // lista de categorías desde backend
  userId: number = 1; // <-- Reemplaza esto por el ID del usuario logueado

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cargar categorías
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  // Guardar producto
  saveProduct(): void {
    if (!this.product.name || !this.product.category) {
      alert('El nombre y la categoría son obligatorios');
      return;
    }

    // Construimos el DTO que el backend espera
    const productDTO = {
      name: this.product.name,
      description: this.product.description,
      categoryId: this.product.category.id, // enviamos solo el ID de la categoría
      condition: this.product.condition,
      price: this.product.price,
      imageUrl: this.product.imageUrl,
      userId: this.userId // ID del usuario logueado
    };

    this.productService.createProduct(productDTO).subscribe({
      next: () => {
        alert('Producto creado correctamente');
        this.router.navigate(['/products']); // volver al listado
      },
      error: (err) => {
        console.error('Error al crear producto', err);
        alert('Hubo un error al crear el producto');
      }
    });
  }
}
