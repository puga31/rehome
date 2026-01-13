import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product!: Product;
  loading = true;
  categories: Category[] = []; // <-- categorías cargadas del backend

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService, // <-- servicio de categorías
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Cargar categorías
    this.categoryService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });

    // Cargar producto
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar producto:', err);
        this.loading = false;
      }
    });
  }

  save(): void {
    if (!this.product.name || !this.product.category) {
      alert('El nombre y la categoría son obligatorios');
      return;
    }

    this.productService.updateProduct(this.product.id!, this.product).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.router.navigate(['/products']);
      },
      error: (err) => console.error('Error al actualizar producto:', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
