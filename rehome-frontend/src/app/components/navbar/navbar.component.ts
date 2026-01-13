import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
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
  private productsLoaded = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private productCache: ProductCacheService,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.cartCount = this.cartService.getCount();
    });

    this.productCache.loadProducts().then(() => {
      this.productsLoaded = true;
    });
  }

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
