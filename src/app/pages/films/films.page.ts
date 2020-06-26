import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  constructor(private navController: NavController, private router: Router, private api:ApiService, private platform: Platform, private http: HttpClient ) { 

  }
  films: Observable<any>;

  ngOnInit() {
    // this.films = this.http.get('https://swapi.dev/api/films');
    this.platform.ready().then(() => {
      this.films = this.api.getFilms();
      // this.films.subscribe(data => {
      //   console.log(data);
      // })
    });
  };

  showFilmDetails(film){
    // this.router.navigateByUrl(`/tabs/films/45`);
    let split = film.url.split('/');
    let filmId= split[split.length-2];
    this.router.navigateByUrl(`/tabs/films/${filmId}`);
  };

  showPlanets(){
  //  this.films = this.http.get('https://swapi.dev/api/films');
  //  this.films.subscribe(data => {
  //   console.log(data);
  // })
    this.navController.navigateRoot('tabs/planets');
  }
}
