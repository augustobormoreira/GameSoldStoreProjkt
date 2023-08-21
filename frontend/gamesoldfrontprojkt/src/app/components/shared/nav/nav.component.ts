import { Component, OnInit } from '@angular/core';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { CartserviceService } from 'src/app/service/cartservice.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  faCartPlus = faCartPlus;

  public totalCartItems: number = 0;
  constructor(private cartService: CartserviceService){};


  ngOnInit(): void {
    
    this.cartService.getProductList()
      .subscribe(res => {
        this.totalCartItems = res.length;
      })
      
  }

}
