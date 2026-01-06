import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    // Cargar carrito desde localStorage al iniciar
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.cartSubject.next(this.items);
    }

    // Escuchar cambios en otras pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === 'cart') {
        this.items = event.newValue ? JSON.parse(event.newValue) : [];
        this.cartSubject.next(this.items);
      }
    });
  }

  // Guardar carrito en localStorage
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  // Añadir producto
  addToCart(product: Product): void {
    const existingItem = this.items.find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({
        product,
        quantity: 1
      });
    }

    this.cartSubject.next(this.items);
    this.saveCart();
  }

  // Quitar una unidad
  removeOne(productId: number): void {
    const index = this.items.findIndex(
      item => item.product.id === productId
    );

    if (index !== -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity--;
      } else {
        this.items.splice(index, 1);
      }
    }

    this.cartSubject.next(this.items);
    this.saveCart();
  }

  // Vaciar carrito
  clearCart(): void {
    this.items = [];
    this.cartSubject.next(this.items);
    this.saveCart();
  }

  // Total del carrito
  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    );
  }

  // Cantidad total de productos
  getCount(): number {
    return this.items.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
}
