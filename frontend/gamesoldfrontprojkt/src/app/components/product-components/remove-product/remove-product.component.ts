import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from 'src/app/service/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {
  productId!: String | null;
  constructor(private httpClient: HttpClient, private gameService: GameService, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onSubmit(id: any) {
      this.gameService.removeGame(id.target.productId.value);
  }
}
