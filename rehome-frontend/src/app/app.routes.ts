import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // Nuevo producto
  { path: 'products/new', component: ProductCreateComponent },

  // Editar
  { path: 'products/edit/:id', component: ProductEditComponent },

  // Detalle
  { path: 'products/:id', component: ProductDetailComponent },

  // Listado de productos
  { path: 'products', component: ProductListComponent },

  // Listado por categoría
  { path: 'products/category/:id', component: ProductListComponent },

  // Carrito
  { path: 'cart', component: CartComponent },
];
