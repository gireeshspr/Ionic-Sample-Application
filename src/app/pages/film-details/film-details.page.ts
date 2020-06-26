import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.page.html',
  styleUrls: ['./film-details.page.scss'],
})
export class FilmDetailsPage implements OnInit {
  filmId = null;
  film : any;
  isFavorite = false;

  constructor(private actRoute: ActivatedRoute, private api: ApiService, private emailCmpsr:EmailComposer, private favService:FavoriteService) { }

  ngOnInit() {
    this.filmId = this.actRoute.snapshot.paramMap.get('id');
    this.api.getFilm(this.filmId).subscribe(data =>{
      this.film = data;
    });

    this.favService.isFavoriteFilm(this.filmId).then(isFav=>{
      this.isFavorite = isFav;
    })
  };

  shareFilm(){
    let email = {
      to: 'gireesh.viswanathan@radian.com',
      subject: 'I Love This Film - ' + this.film.title,
      body:'Do you remember this? <br/><br/>\"' + this.film.opening_crawl + '\"',
      isHtml:true
    };
    this.emailCmpsr.open(email);
  };

  favoriteFilm(){
    this.favService.favoriteFilm(this.filmId).then(() =>{
      this.isFavorite = true;
    });
  }

  unFavoriteFilm(){
    this.favService.favoriteFilm(this.filmId).then(() =>{
      this.isFavorite = false;
    });
  }

}
