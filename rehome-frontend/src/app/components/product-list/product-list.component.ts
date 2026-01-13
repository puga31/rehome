import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, ParamMap } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  categoryId: number | null = null; // <-- para guardar la categoría actual

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Nos suscribimos a los cambios de parámetros de la ruta
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const idParam = params.get('id');
          this.categoryId = idParam ? Number(idParam) : null;

          if (this.categoryId) {
            this.loading = true;
            return this.productService.getProductsByCategory(this.categoryId);
          } else {
            this.loading = true;
            return this.productService.getProducts();
          }
        })
      )
      .subscribe({
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

  // Navegación
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
          this.reloadProducts();
        },
        error: (err) => console.error('Error al borrar producto:', err)
      });
    }
  }

  // Recargar productos después de borrar
  private reloadProducts(): void {
    if (this.categoryId) {
      this.productService.getProductsByCategory(this.categoryId).subscribe((data) => this.products = data);
    } else {
      this.productService.getProducts().subscribe((data) => this.products = data);
    }
  }
}
