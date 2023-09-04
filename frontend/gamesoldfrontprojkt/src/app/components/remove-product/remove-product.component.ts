import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {
  @ViewChild('content') content: any;
  private closeResult!: String;
  
  constructor(private httpClient: HttpClient, private modalService: NgbModal) { }
  
  ngOnInit(): void {
  }

  onSubmit(id: any) {
    this.httpClient.delete(`${environment.API_URL}/games/removeProduct/${id.target.productId.value}`)
      .subscribe((result) => {
        console.log("result ", result);
      })
  }

  openModalService(){
    this.modalService.open(this.content, {size: 'x1'} ).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      console.log(reason);
    });
  }


}
