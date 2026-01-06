import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductCacheService {
  private products: Product[] = [];
  private productsLoaded = false;

  constructor(private productService: ProductService) {}

  // Cargar productos desde el backend solo una vez
  loadProducts(): Promise<Product[]> {
    if (this.productsLoaded) {
      return Promise.resolve(this.products);
    }

    return this.productService.getProducts().toPromise().then(data => {
      this.products = data || [];
      this.productsLoaded = true;
      return this.products;
    });
  }

  // Filtrar productos en memoria
  filterProducts(term: string): Product[] {
    if (!this.products) return [];
    const t = term.toLowerCase();
    return this.products.filter(p => p.name.toLowerCase().includes(t));
  }
}
