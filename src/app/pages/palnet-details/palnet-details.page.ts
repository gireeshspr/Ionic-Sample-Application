import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-palnet-details',
  templateUrl: './palnet-details.page.html',
  styleUrls: ['./palnet-details.page.scss'],
})
export class PalnetDetailsPage implements OnInit {
  planet:any;
  constructor(private actRouter: ActivatedRoute, private api:ApiService) { }

  ngOnInit() {
    let planetId = this.actRouter.snapshot.paramMap.get('id');
    this.api.getPlanet(planetId).subscribe(data =>{
      this.planet = data;
    });
  };
};
