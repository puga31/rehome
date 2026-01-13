import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // Producto inicial vacío
  product: Product = {
    id: 0, // temporal, el backend generará el real
    name: '',
    description: '',
    category: null, // ahora puede ser null o un objeto Category
    condition: 'Used',
    price: 0,
    imageUrl: ''
  };

  categories: Category[] = []; // <-- lista de categorías desde backend

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, // <-- inyectamos el servicio
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

    // Preparamos el objeto a enviar al backend
    const productToSend = {
      ...this.product,
      categoryId: this.product.category.id // enviamos solo el ID de la categoría
    };

    this.productService.createProduct(productToSend).subscribe({
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
