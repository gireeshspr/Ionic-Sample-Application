import { Component, OnInit } from '@angular/core';
import { DatabaseService, Dev } from 'src/app/services/database.service';
import { Observable } from 'rxjs';
import { PresetDbService } from 'src/app/services/preset-db-service';
import { SettingsdbService } from 'src/app/services/settingsdb.service';

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
  settings: Observable<any>;

  constructor(private db:DatabaseService, private presDb: PresetDbService, private setdb:SettingsdbService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy =>{
      if (rdy){
        this.db.getDevs().subscribe(devs =>{
          this.developers = devs;
        });
        this.products = this.db.getProducts();
      }
    });
    // this.presDb.getPreset();
    this.setdb.getSettings().subscribe(data =>{
      this.settings = data;
      console.log(data);
    });
    
  };

  addDeveloper(){
    this.setdb.addSetting( {name:'Test 2', value:'Val 2'} ).then(data =>{
      this.settings = this.setdb.getSettings();
    });
  };
  
  addProduct(){

  }
}
