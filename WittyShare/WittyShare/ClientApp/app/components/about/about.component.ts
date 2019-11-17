import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  useremail: string;
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        let p = params['foo'];
        this.useremail = p;
      });
  }

}
