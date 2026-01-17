import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { LoginComponent } from './components/login/login.component';
import { LatestProductsComponent } from './components/latest-products/latest-products.component'; // <-- IMPORT

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products/new', component: ProductCreateComponent },
  { path: 'products/edit/:id', component: ProductEditComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/category/:id', component: ProductListComponent },
  { path: 'latest', component: LatestProductsComponent }, // <-- NUEVO
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '/products' }
];
