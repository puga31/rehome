import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // Listado
  { path: 'products', component: ProductListComponent },

  // Detalle
  { path: 'products/:id', component: ProductDetailComponent },

  // Editar
  { path: 'products/edit/:id', component: ProductEditComponent },

  // Carrito
  { path: 'cart', component: CartComponent },
];
