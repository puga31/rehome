import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service'; // <-- AÑADIR

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class LatestProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService // <-- INYECTAR
  ) {}

  ngOnInit(): void {
    this.productService.getLatestProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err)
    });
  }

  // <-- MÉTODO PARA AÑADIR AL CARRITO
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
