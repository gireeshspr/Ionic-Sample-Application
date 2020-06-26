import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const FAVORITE_KEY = 'favoriteFilms';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private storage: Storage ) { }

  getAllFavoriteFilms(){
    return this.storage.get(FAVORITE_KEY);
  }

  isFavoriteFilm(filmId){
    return this.getAllFavoriteFilms().then(result => {
      return (result && result.indexOf(filmId)  != -1);
    });
  };

  favoriteFilm(filmId){
    return this.getAllFavoriteFilms().then(result => {
      if (result){
        result.push(filmId);
        return this.storage.set(FAVORITE_KEY, result);
      }
      else{
        return this.storage.set(FAVORITE_KEY, [filmId]);
      };
    });
  };

  unfavoriteFilm(filmId){
    return this.getAllFavoriteFilms().then(result =>{
      if (result){
        var idx = result.indexOf(filmId);
        result.splice(idx, 1);
        return this.storage.set(FAVORITE_KEY, result);
      };
    });
  };
  
}
