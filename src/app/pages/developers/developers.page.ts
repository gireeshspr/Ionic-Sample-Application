import { Component, OnInit } from '@angular/core';
import { DatabaseService, Dev } from 'src/app/services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage implements OnInit {
  developers: Dev[] = [];
  developer = {};
  product = {};
  selectedView ='devs';
  products: Observable<any>;

  constructor(private db:DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy =>{
      if (rdy){
        this.db.getDevs().subscribe(devs =>{
          this.developers = devs;
        });
        this.products = this.db.getProducts();
      }
    });
  };

  addDeveloper(){

  }

  addProduct(){

  }
}
