import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  
  constructor(private httpClient: HttpClient, private modalService: NgbModal, public dialogRef: MatDialogRef<RemoveProductComponent>) { }
  
  ngOnInit(): void {
  }

  onSubmit(id: any) {
    this.httpClient.delete(`${environment.API_URL}/games/removeProduct/${id.target.productId.value}`)
      .subscribe((result) => {
        console.log("result ", result);
      })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  


}
