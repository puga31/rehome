import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductCacheService } from '../../services/product-cache.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount = 0;
  searchTerm: string = '';
  suggestions: Product[] = [];

  private productsLoaded = false; // controla si la cache ya terminó de cargar

  constructor(
    private cartService: CartService,
    private router: Router,
    private productCache: ProductCacheService
  ) {}

  ngOnInit(): void {
    // Contador del carrito
    this.cartService.cart$.subscribe(items => {
      this.cartCount = this.cartService.getCount();
    });

    // Cargar productos en cache al inicio
    this.productCache.loadProducts().then(() => {
      this.productsLoaded = true;
      this.updateSuggestions();
    });
  }

  // Al escribir en el input
  onSearch(): void {
    if (!this.searchTerm) {
      this.suggestions = [];
      return;
    }

    if (!this.productsLoaded) {
      // Esperar a que la cache termine de cargar
      this.productCache.loadProducts().then(() => {
        this.productsLoaded = true;
        this.updateSuggestions();
      });
    } else {
      // filtrar directamente en memoria
      this.updateSuggestions();
    }
  }

  // Actualiza la lista de sugerencias
  private updateSuggestions(): void {
    this.suggestions = this.productCache
      .filterProducts(this.searchTerm)
      .slice(0, 5); // máximo 5 sugerencias
  }

  // Ir al detalle del producto
  goToProduct(id: number): void {
    this.router.navigate(['/products', id]);
    this.searchTerm = '';
    this.suggestions = [];
  }
}
