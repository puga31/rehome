import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { LoginComponent } from './components/login/login.component'; // 🔹 Importar login

export const routes: Routes = [
  // Redirección por defecto
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  // Login
  { path: 'login', component: LoginComponent }, // 🔹 Nueva ruta de login

  // Nuevo producto
  { path: 'products/new', component: ProductCreateComponent },

  // Editar producto
  { path: 'products/edit/:id', component: ProductEditComponent },

  // Detalle producto
  { path: 'products/:id', component: ProductDetailComponent },

  // Listado de productos
  { path: 'products', component: ProductListComponent },

  // Listado por categoría
  { path: 'products/category/:id', component: ProductListComponent },

  // Carrito
  { path: 'cart', component: CartComponent },

  // Ruta comodín → redirige a listado de productos
  { path: '**', redirectTo: '/products' }
];
