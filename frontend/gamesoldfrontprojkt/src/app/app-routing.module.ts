import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterUserComponent } from './components/user-components/register-user/register-user.component';
import { AddNewuserComponent } from './components/user-components/add-newuser/add-newuser.component';
import { RemoveUserComponent } from './components/user-components/remove-user/remove-user.component';
import { UpdateUserComponent } from './components/user-components/update-user/update-user.component';
import { AddProductComponent } from './components/product-components/add-product/add-product.component';
import { RemoveProductComponent } from './components/product-components/remove-product/remove-product.component';
import { UpdateProductComponent } from './components/product-components/update-product/update-product.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { UserPanelComponent } from './components/control-panel/user-panel/user-panel.component';
import { GamePanelComponent } from './components/control-panel/game-panel/game-panel.component';
import { AlluserscomponentComponent } from './components/control-panel/user-panel/alluserscomponent/alluserscomponent.component';
import { AllgamescomponentComponent } from './components/control-panel/game-panel/allgamescomponent/allgamescomponent.component';
import { OrderPanelComponent } from './components/control-panel/order-panel/order-panel.component';
import { AllorderscomponentComponent } from './components/control-panel/order-panel/allorderscomponent/allorderscomponent.component';
import { UpdateOrderComponentComponent } from './components/orders/update-order/update-order-component/update-order-component.component';
import { AuthGuard } from './service/authguard';

const routes: Routes = [
  {path: '', redirectTo: 'user-login', pathMatch: 'full'},
  {path: 'user-login', component: LoginComponent},
  {path:'product-list', component: ProductListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'control-panel', component: ControlPanelComponent,
    children: [
      {
        path: 'user-panel',
        component: UserPanelComponent,
        children: [
          {
            path: '',
            component: AlluserscomponentComponent
          },
          {
            path: 'all-users',
            component: AlluserscomponentComponent
          },          
          {
            path: 'add-user',
            component: AddNewuserComponent
          },
          {
            path: 'update-user',
            component: UpdateUserComponent
          },
          {
            path: 'remove-user',
            component: RemoveUserComponent
          },
          {
            path: 'update-user/:role/:id',
            component: UpdateUserComponent
          },
          {
            path: 'remove-user/:id',
            component: RemoveUserComponent
          }
        ]      
      },
      {
        path: 'game-panel',
        component: GamePanelComponent,
        children: [
          {
            path: '',
            component: AllgamescomponentComponent
          },
          {
            path: 'all-games',
            component: AllgamescomponentComponent
          },
          {
            path: 'add-game',
            component: AddProductComponent
          },
          {
            path: 'update-game',
            component: UpdateProductComponent
          },
          {
            path: 'remove-game',
            component: RemoveProductComponent
          },
          {
            path: 'remove-game/:id',
            component: RemoveProductComponent
          },
          {
            path: 'update-game/:id',
            component: UpdateProductComponent
          }
        ]
      },
      {
        path: 'order-panel',
        component: OrderPanelComponent,
        children: [
          {
            path: '',
            component: AllorderscomponentComponent
          },
          {
            path: 'all-orders',
            component: AllorderscomponentComponent
          },
          {
            path: 'update-order',
            component: UpdateOrderComponentComponent
          },
          {
            path: 'update-order/:id',
            component: UpdateOrderComponentComponent
          }
        ]
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
