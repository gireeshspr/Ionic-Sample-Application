import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Dev{
  id:number,
  name:string,
  skills:any[],
  img:string
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  developers = new BehaviorSubject([]);
  products= new BehaviorSubject([]);

  constructor(private plt:Platform, private sqlite:SQLite, private http:HttpClient, private sqliteporter: SQLitePorter ) {
    this.plt.ready().then(() =>{
      this.sqlite.create({
        name: 'developer.db',
        location:'default'
      }).then((db: SQLiteObject) =>{
        this.database = db;
        this.seedDatabase();
      }); 
    });
   };

   seedDatabase(){
    this.http.get('assets/seed.sql',{ responseType: 'text'}).subscribe(sql => {
      this.sqliteporter.importSqlToDb(this.database, sql).then(_ => {
        this.loadDevelopers();
        this.loadProducts();
        this.dbReady.next(true);
      }).catch(
        e => console.error(e)
        );
    });
   };

   getDatabaseState(){
     return this.dbReady.asObservable();
   };

   getDevs(): Observable<Dev[]>{
     return this.developers.asObservable();
   };

   getProducts(): Observable<any[]>{
     return this.products.asObservable();
   };

   loadDevelopers(){
    this.database.executeSql('SELECT * FROM developer', []).then(data =>{
      let developers: Dev[] = [];

      if (data.rows.length > 0){
        for(var i = 0; i < data.rows.length - 1; i++){
          let skills = [];

          if (data.rows.item(i).skills != ''){
            skills = JSON.parse(data.rows.item(i).skills);
          }

          developers.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            skills: skills,
            img: data.rows.item(i).img
          });
        }
      }
      this.developers.next(developers);
    })
   };

   addDeveloper(){

   };

   getDeveloper(){

   };

   deleteDeveloper(){

   };
   
   loadProducts(){
    let query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
    return this.database.executeSql(query,[]).then(data => {
      let products =[];
      if (data.rows.length > 0){
        for (var i = 0; i < data.rows.length -1; i++){
          products.push({
            name: data.rows.item(i).name,
            id: data.rows.item(i).id,
            creator: data.rows.item(i).creator
          });
        }
      }
      this.products.next(products);
    })
   };

   addProduct(){

   };
};

