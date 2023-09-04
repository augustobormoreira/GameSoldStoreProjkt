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
import { AddProductComponent } from './components/add-product/add-product.component';
import { RemoveProductComponent } from './components/remove-product/remove-product.component';
import { AddNewuserComponent } from './components/add-newuser/add-newuser.component';
import { RemoveUserComponent } from './components/remove-user/remove-user.component';
import { UserService } from './service/user.service';

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
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [GameService, LoginService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }, SearchGameService, UserService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddNewuserComponent
]
})
export class AppModule { }
