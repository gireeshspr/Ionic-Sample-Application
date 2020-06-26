import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.page.html',
  styleUrls: ['./planets.page.scss'],
})
export class PlanetsPage implements OnInit {

  constructor(private router: Router, private api:ApiService) { }

  planets:Observable<any>;

  ngOnInit() {
    this.planets = this.api.getPlanets();
    this.planets.subscribe(data => {
      console.log(data);
    });
  }


  showPlanetDetail(planet){
    let split = planet.url.split('/');
    var planetId = split[split.length - 2];
    this.router.navigateByUrl(`/tabs/planets/${planetId}`);
  }
}
