import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartCount = 0; // contador de productos

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Suscribimos al observable del carrito
    this.cartService.cart$.subscribe(items => {
      this.cartCount = this.cartService.getCount(); // actualiza automáticamente el contador
    });
  }
}
