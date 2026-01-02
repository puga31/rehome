import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true, // <-- si es standalone
  imports: [CommonModule], // <-- aquí agregas CommonModule
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.loading = false;
      }
    });
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que quieres borrar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Producto borrado correctamente');
          this.loadProducts();
        },
        error: (err) => console.error('Error al borrar producto:', err)
      });
    }
  }
}
