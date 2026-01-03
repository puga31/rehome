import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: Product[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Nos suscribimos al observable del carrito
    this.cartService.cart$.subscribe(items => {
      this.items = items;
      this.total = this.items.reduce((sum, p) => sum + (p.price || 0), 0);
    });
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  clear(): void {
    this.cartService.clearCart();
  }
}
