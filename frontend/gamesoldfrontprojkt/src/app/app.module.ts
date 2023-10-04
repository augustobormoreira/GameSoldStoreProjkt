import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ListItemComponent } from './components/product-list/list-item/list-item.component';
import { GameService } from './service/game.service';
import { InterceptorInterceptor } from './service/interceptor.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './service/login.service';
import { SearchGameService } from './service/searchGame.service';
import { RemoveUserComponent } from './components/user-components/remove-user/remove-user.component';
import { UserService } from './service/user.service';
import { UpdateProductComponent } from './components/product-components/update-product/update-product.component';
import { CartserviceService } from './service/cartservice.service';
import { RegisterUserComponent } from './components/user-components/register-user/register-user.component';
import { UpdateUserComponent } from './components/user-components/update-user/update-user.component';
import { AddNewuserComponent } from './components/user-components/add-newuser/add-newuser.component';
import { AddProductComponent } from './components/product-components/add-product/add-product.component';
import { RemoveProductComponent } from './components/product-components/remove-product/remove-product.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { UserPanelComponent } from './components/control-panel/user-panel/user-panel.component';
import { GamePanelComponent } from './components/control-panel/game-panel/game-panel.component';
import { AlluserscomponentComponent } from './components/control-panel/user-panel/alluserscomponent/alluserscomponent.component';
import { AllgamescomponentComponent } from './components/control-panel/game-panel/allgamescomponent/allgamescomponent.component';
import { OrderPanelComponent } from './components/control-panel/order-panel/order-panel.component';
import { AllorderscomponentComponent } from './components/control-panel/order-panel/allorderscomponent/allorderscomponent.component';
import { OrderService } from './service/order.service';
import { UpdateOrderComponentComponent } from './components/orders/update-order/update-order-component/update-order-component.component';
import { RegisterUserCardComponent } from './components/user-components/register-user-card/register-user-card.component';
import { CardService } from './service/card.service';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    LoginComponent,
    NavComponent,
    ProductListComponent,
    ListItemComponent,
    AddProductComponent,
    RemoveProductComponent,
    AddNewuserComponent,
    RemoveUserComponent,
    UpdateProductComponent,
    UpdateUserComponent,
    RegisterUserComponent,
    ControlPanelComponent,
    UserPanelComponent,
    GamePanelComponent,
    AlluserscomponentComponent,
    AllgamescomponentComponent,
    OrderPanelComponent,
    AllorderscomponentComponent,
    UpdateOrderComponentComponent,
    RegisterUserCardComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatIconModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [GameService, LoginService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }, SearchGameService, UserService, CartserviceService, OrderService, CardService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddNewuserComponent
]
})
export class AppModule { }
