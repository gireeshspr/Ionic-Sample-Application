import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

const DB_NAME: string = 'developer.psetdb';
const DB_LOCATION: string = 'default';

/*
** PresetDbService - represents the 'PresetDbService' injectable component, helps us to store, retrieve, list and delete presets.
*/

// @Injectable()
@Injectable({
    providedIn: 'root'
  })

export class PresetDbService {

    presetDb: SQLiteObject;
    data: any;
    dateTime: any;
    collectPresetName: any;
    collectPresetByName: any;


    constructor(private http: HttpClient, private platform: Platform, private sqlite: SQLite) {
        this.platform.ready().then(() => {
            this.createDBObj();
        });
    }
    
    createDBObj(): void {
        // this.sqlite.create(
        //     {
        //         name: DB_NAME,
        //         location: DB_LOCATION
        //     }).then((db : SQLiteObject) => {
        //         this.presetDb = db;
        //         this.initializeDataService();
        //     }, (error) => {

        //     });
        this.initializeDataService();
        }

    /*
    ** initialize service - Create table to store, retrieve, list and delete presets.
    */
    initializeDataService() {
        this.platform.ready().then(() => {
            this.sqlite.create({ name: "developer.psetdb", location: "default" }).then((db : SQLiteObject) => {
                this.presetDb = db;
                this.presetDb.executeSql('CREATE TABLE IF NOT EXISTS PresetsTable (loanType VARCHAR, armType VARCHAR, buydown BOOLEAN, propertyState VARCHAR, propertyType VARCHAR, unitsCount INTEGER, underwritingMethod VARCHAR, auSystem VARCHAR, auResponse VARCHAR, presetName VARCHAR, lenderMP VARCHAR, updatedOn INTEGER, PRIMARY KEY (presetName) )',[]).then((data) => {
                    // this.deleteMessages();
                    this.getPreset();
                }, (error) => {

                });
            }, (error) => {

            });
        });
    }

    /*
    ** get all presets from table.
    */
    getPreset() {
        return new Promise((resolve, reject) => {
            this.presetDb.executeSql("SELECT rowid,* FROM PresetsTable ORDER BY updatedOn DESC LIMIT 3", []).then((data) => {
                let presetName = [];

                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        presetName.push({ presetname: data.rows.item(i).presetName, rowid: data.rows.item(i).rowid });
                    }

                }
                resolve(presetName);
            }, (error) => {
                reject(error);
            });
        });
    }

    /*
    ** get particular presets from table using preset name.
    */
    getPresetByName(rowid) {
        return new Promise((resolve, reject) => {
            this.presetDb.executeSql("SELECT rowid,* FROM PresetsTable where rowid='" + rowid + "'", []).then((data) => {
                let presetResult = {};
                if (data.rows.length > 0) {
                    presetResult = data.rows.item(0);
                }
                resolve(presetResult);
            }, (error) => {
                reject(error);
            });
        });
    }

    /*
    ** insert presets into table.
    */
    addPreset(data) {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        let noOfUnits = data.noOfUnits;
        let lenderMPData = data.lenderMP;

        if (noOfUnits == null) {
            noOfUnits = 0;
        }
        return new Promise((resolve, reject) => {
            this.presetDb.executeSql("INSERT INTO PresetsTable (loanType, armType, buydown, propertyState, propertyType, unitsCount, underwritingMethod, auSystem, auResponse, presetName, lenderMP, updatedOn) VALUES ('" + data.loanType + "','" + data.irfp + "','" + data.buyDown + "','" + data.propState + "','" + data.propType + "','" + noOfUnits + "','" + data.underWriting + "','" + data.auSystem + "','" + data.auResponse + "', '" + data.presetName + "', '" + lenderMPData + "', '" + this.dateTime + "')", []).then((data) => {
                // if (lenderMPData != '') {
                //     this.presetDb.executeSql("UPDATE PresetsTable SET lenderMP = '" + lenderMPData + "'", []).then((data) => {
                //     }, (error) => {

                //     });
                // }
                let presetResult = "Saved Successfully";
                resolve(presetResult);
                this.getPreset();
            }, (error) => {
                reject(error);
            });
        });
    }

    /*
    ** update particular presets from table using preset id.
    */
    updatePreset(data) {
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getTime();
        let lenderMPData = data.lenderMP;
        return new Promise((resolve, reject) => {
            this.presetDb.executeSql("UPDATE PresetsTable SET loanType = '" + data.loanType + "', armType = '" + data.irfp + "', buydown = '" + data.buyDown + "', propertyState = '" + data.propState + "', propertyType = '" + data.propType + "', unitsCount = '" + data.noOfUnits + "', underwritingMethod = '" + data.underWriting + "', auSystem = '" + data.auSystem + "', auResponse = '" + data.auResponse + "', presetName = '" + data.presetName + "', lenderMP = '" + lenderMPData + "', updatedOn = '" + this.dateTime + "' where rowid = '" + data.rowid + "'", []).then((data) => {
                if (lenderMPData != '') {
                    this.presetDb.executeSql("UPDATE PresetsTable SET lenderMP = '" + lenderMPData + "'", []).then((data) => {
                    }, (error) => {

                    });
                }
                let presetResult = "Updated Successfully";

                resolve(presetResult);
            }, (error) => {
                reject(error);

            });
        });
    }

    /*
    ** delete particular presets from table using preset name.
    */
    deletePresetByName(rowid) {
        return new Promise((resolve, reject) => {
            this.presetDb.executeSql("DELETE FROM PresetsTable where rowid='" + rowid + "'", []).then((data) => {
                let presetResult = "Deleted Successfully";

                resolve(presetResult);
            }, (error) => {
                reject(error);
            });
        });
    }

    /*
    ** delete presets from table .
    */
    deletePreset() {
        this.presetDb.executeSql("DELETE FROM PresetsTable", []).then((data) => {
        }, (error) => {
        });
    }
}
