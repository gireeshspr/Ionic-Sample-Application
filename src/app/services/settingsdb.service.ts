import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsdbService {
  private settingsDb: SQLiteObject;
  settings = new BehaviorSubject([]);

  constructor(private sqlite:SQLite, private plt: Platform) {
    this.plt.ready().then(()=>{
      this.sqlite.create({
        name:'developer.settingsdb',
        location:'default'
      }).then((db:SQLiteObject) =>{
        this.settingsDb = db;
        this.settingsDb.executeSql('CREATE TABLE IF NOT EXISTS developersettings(id INTEGER PRIMARY KEY AUTOINCREMENT,settingname TEXT, settingvalue TEXT)',[]).then(data =>{
          this.addSetting({ name:"Test Setting", value:"test"});
        })
      });
    });
   };

   addSetting(data){
    return this.settingsDb.executeSql('INSERT INTO developersettings (settingname, settingvalue) VALUES (?,?)',[data.name, data.value]).then(d=>{
      this.loadSettings();
    })
   };

   loadSettings(){
    return this.settingsDb.executeSql('SELECT * FROM developersettings', []).then(data=>{
      let settings=[];
      if (data.rows.length > 0){
        for(var i = 0; i < data.rows.length; i++){
          settings.push({ 
            settingname: data.rows.item(i).settingname, 
            settingvalue: data.rows.item(i).settingvalue
          });
        };
      };
      this.settings.next(settings);
    });
   };

   ploadSettings(){
    return new Promise((resolve, reject) => {
      this.settingsDb.executeSql('SELECT * FROM developersettings', []).then((data) => {
          let presetResult = {};
          if (data.rows.length > 0) {
              presetResult = data.rows.item(0);
          }
          resolve(presetResult);
      }, (error) => {
          reject(error);
      });
    });
   };

   getSettings(): Observable<any>{
     return this.settings.asObservable();
   };

   getSetting(id){
    return this.settingsDb.executeSql('SELECT * FROM developersettings WHERE id = ?', [id]).then(data =>{
      
    })
   }
}
