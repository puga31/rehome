import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  // Producto inicial vacío
  product: Product = {
    id: 0, // temporal, el backend generará el real
    name: '',
    description: '',
    category: '',
    condition: 'Used',
    price: 0,
    imageUrl: ''
  };

  constructor(private productService: ProductService, private router: Router) {}

  // Guardar producto
  saveProduct(): void {
    if (!this.product.name || !this.product.category) {
      alert('El nombre y la categoría son obligatorios');
      return;
    }

    this.productService.createProduct(this.product).subscribe({
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
