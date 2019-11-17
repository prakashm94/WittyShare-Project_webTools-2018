import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Person } from '../models/index';
import { Article } from '../models/index';
import { Event } from '../models/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {

  constructor(private router: Router, private http: Http, private route: ActivatedRoute) { }
  person: Person = new Person(null);
  personId: number;
  useremail: string;
  commCount: number=0;
  articleCount: number=0;
  articleList: Array<Article> = new Array();

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        let pid = params['bar'];
        this.personId = pid;
        console.log(this.personId);
        let p = params['foo'];
        this.useremail = p;
        console.log(this.useremail);
      });


    this.http.get("/api/home/articles")
      .subscribe((res: Response) => {
        console.log(res.json());
        this.articleList = res.json();
         console.log("articleList is" + this.articleList[0].title);
      });


    this.http.get("/api/home/" + this.useremail + "/Person/" + this.personId)
      .subscribe((res: Response) => {
        console.log(res.json());
        this.person = res.json()[0];
        console.log("person name" + this.person.fullname)

        for (let article of this.articleList) {
          console.log(article.creator.email + "    " + this.person.email); // 1, "string", false
          if (article.creator.email == (this.person.email)) {
            this.articleCount = this.articleCount + 1;

          }
          //if (article.comments != '' || article.comments != "undefined" || article.comments != null ) {
          //  console.log(" com len  " + article.comments);
          //  if ((article.comments.commentedBy) == (this.person)) {
          //    this.commCount = this.commCount + 1;
          //  }
          //}

          console.log(this.articleCount + "   counts   " + this.commCount);
        }


      });

    console.log(this.person.email + "   before   " + this.commCount);
    //testing purpose comment after use
    //this.http.get("/api/home/po/Person/18")
    //  .subscribe((res: Response) => {
    //    console.log(res.json());
    //    this.person = res.json()[0];
    //    console.log("person name" + this.person.fullname)
    //  });


  }


}
