import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, ParamMap } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Nos suscribimos a cambios de parámetros
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = Number(params.get('id'));
          if (isNaN(id)) return of(null); // Si no hay id válido, devolvemos null
          this.loading = true;
          return this.productService.getProduct(id);
        })
      )
      .subscribe({
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

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('Producto añadido al carrito');
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
