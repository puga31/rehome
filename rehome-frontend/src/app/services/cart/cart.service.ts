import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Product[] = [];

  // BehaviorSubject para notificar cambios
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable(); // Observable público

  // Obtener productos actuales
  getItems(): Product[] {
    return this.items;
  }

  // Añadir producto al carrito
  addToCart(product: Product): void {
    this.items.push(product);
    this.cartSubject.next(this.items); // Notifica cambio
  }

  // Eliminar producto por índice
  removeFromCart(index: number): void {
    this.items.splice(index, 1);
    this.cartSubject.next(this.items); // Notifica cambio
  }

  // Vaciar carrito
  clearCart(): void {
    this.items = [];
    this.cartSubject.next(this.items); // Notifica cambio
  }

  // Número de productos
  getCount(): number {
    return this.items.length;
  }
}
