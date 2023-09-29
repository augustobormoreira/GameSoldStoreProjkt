import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gamesoldfrontprojkt';


  adminIsLoggedIn(){
    const userToken = this.decodeJWT();
    if(userToken != null && userToken.userIdAndName[1]=="ADMIN"){
      return true;
    }

    return false;
  }

  decodeJWT(): any{
    try {
      return jwtDecode(sessionStorage.getItem('sessionToken')!);
    }catch(Error){
      return null;
    }
  }
}
