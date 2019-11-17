import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Person } from '../models/index';
import { Article } from '../models/index';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: Http) { }
  person: Person = new Person(null);
  
  email: string;
  password: string;
  repeatPassword: string;
  articleList: Array<Article> = new Array();
  persons: Array<Person> = new Array();
  max: number;
  ngOnInit() {
   
  }

  onLogin() {
    this.http.get("/api/home/" + this.email + "/" + this.password) 
      .subscribe((res: Response) => {
        console.log(res.json());

        this.articleList = res.json();
        console.log(this.articleList);
        if (this.articleList != null) {
          this.router.navigate(['/homepage'], { queryParams: { foo: this.email } });
        }
        });

  }
  
  //onLoginAfter() {
  //  this.router.navigate(['/homepage'], { queryParams: { bar: this.hotelb.id } });

  //}

  onSignUp() {

    console.log(this.person.fullname + "  " + this.person.contact+"  "+this.person.degree);

    if (this.person.fullname != 'undefined' && this.person.contact != 'undefined' && this.person.degree != null && this.person.email != 'undefined'  && this.person.gender != null && this.person.password != 'undefined' && this.person.profession != null && this.person.pic!= null) {

    this.http.get("/api/home/persons")
      .subscribe((res: Response) => {
        console.log(res.json());
        this.persons = res.json();
        var ind = 0;
        for (let a of this.persons) {
          if (a.personId > ind) {
            ind = a.personId;
          }
        }
        this.max = ind;
        this.person.personId = this.max + 1;
        console.log("id max is" + this.max);
          this.http.post("/api/home/PostPerson", this.person)
            .subscribe((res: Response) => {
              console.log(res);
              this.router.navigate(['/homepage'], { queryParams: { foo: this.person.email } });

            });
        });
  }


  
    //this.http.get("/api/home/" + this.person.email + "/" + this.person.password)
    //  //.do(res => {
    //  //  if (res.status == 200)
    //  //    this.router.navigate(['/homepage'], { queryParams: { bar: this.articleList } });
    //  //  ;})
    //  .subscribe((res: Response) => {
    //    console.log(res.json());
    //    this.articleList = res.json();
    //  });
  }

}
