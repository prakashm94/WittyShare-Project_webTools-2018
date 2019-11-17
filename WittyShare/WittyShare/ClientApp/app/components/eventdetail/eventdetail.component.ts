import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route
    .queryParams
    .subscribe(params => {
      let p = params['foo'];
      this.useremail = p;
      let a = params['lat'];
      this.lattitude = a;
      let b = params['lon'];
      this.longitude = b;
      });
  }
  lattitude: number;
  longitude: number;
  useremail: string;
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        let p = params['foo'];
        this.useremail = p;
        let a = params['lat'];
        this.lattitude = a;
        let b = params['lon'];
        this.longitude = b;
      });
  }

}
