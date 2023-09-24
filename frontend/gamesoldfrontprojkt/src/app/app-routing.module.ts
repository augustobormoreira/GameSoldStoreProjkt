import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'user-login', pathMatch: 'full'},
  {path: 'user-login', component: LoginComponent},
  {path:'product-list', component: ProductListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'register-user', component: RegisterUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
