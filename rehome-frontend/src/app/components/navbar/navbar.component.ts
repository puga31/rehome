import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';
import { ProductCacheService } from '../../services/product-cache.service';
import { CategoryService, Category } from '../../services/category.service';
import { AuthService } from '../../services/auth.service'; // 🔹 Import AuthService

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
  private productsLoaded = false;
  categories: Category[] = []; // categorías cargadas del backend

  constructor(
    private cartService: CartService,
    private router: Router,
    private productCache: ProductCacheService,
    private categoryService: CategoryService,
    private eRef: ElementRef,
    private authService: AuthService // 🔹 inyectar AuthService
  ) {}

  ngOnInit(): void {
    // Contador del carrito
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCount();
    });

    // Cargar productos cache
    this.productCache.loadProducts().then(() => {
      this.productsLoaded = true;
    });

    // Cargar categorías desde backend
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  // 🔹 Comprobar si hay usuario logueado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // 🔹 Logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // 🔹 Búsqueda de productos
  onSearch(): void {
    if (!this.searchTerm) {
      this.suggestions = [];
      return;
    }

    if (!this.productsLoaded) {
      this.productCache.loadProducts().then(() => {
        this.productsLoaded = true;
        this.updateSuggestions();
      });
    } else {
      this.updateSuggestions();
    }
  }

  private updateSuggestions(): void {
    this.suggestions = this.productCache
      .filterProducts(this.searchTerm)
      .slice(0, 5);
  }

  goToProduct(id: number): void {
    this.router.navigate(['/products', id]);
    this.resetSearch();
  }

  goToCategory(id: number): void {
    this.router.navigate(['/products/category', id]);
    this.resetSearch();
  }

  private resetSearch(): void {
    this.searchTerm = '';
    this.suggestions = [];
  }

  // Detecta click fuera del navbar y cierra sugerencias
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.suggestions = [];
    }
  }
}
