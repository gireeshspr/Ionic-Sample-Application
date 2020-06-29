import { Component, OnInit } from '@angular/core';
import { PresetDbService } from 'src/app/services/preset-db-service';
import { SettingsdbService } from 'src/app/services/settingsdb.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  settings1: any;
  // settings1: Observable<any>;

  constructor(private presetDb:PresetDbService, private setdb: SettingsdbService) { }

  ngOnInit() {
    // this.presetDb.initializeDataService();
    this.presetDb.getPreset().then(val => {
      console.log('preset val');
      console.log(val);
    });
    // this.settings1 = this.setdb.getSettings();
    // this.setdb.getSettings().subscribe(data => {
    //   this.settings1 = data;
    //   console.log(data)
    // });
    // this.setdb.loadSettings().then(val => {
    //   console.log(val);
    // })
  }

}
