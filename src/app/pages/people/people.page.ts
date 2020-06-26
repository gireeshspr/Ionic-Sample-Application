import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  people:any;
 
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.api.getPeople().subscribe(data=>{
      this.people = data;
      console.log(data);
    });
  };
}
