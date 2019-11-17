import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

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
