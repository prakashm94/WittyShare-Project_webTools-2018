import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Person } from '../models/index';
import { Article } from '../models/index';
import { Event } from '../models/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css']
})
export class CreateeventComponent implements OnInit {

  constructor(private router: Router, private http: Http, private route: ActivatedRoute) { }
  events: Array<Event> = new Array();
  max: number;
  useremail: string;
  event: Event = new Event(null);
  articleId: number;
  article: Article = new Article(null);

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        let p = params['foo'];
        this.useremail = p;
        console.log("Article email in email" + this.useremail);
        let id = params['bar'];
        this.articleId = id;
        console.log("Article id in passed" + this.articleId);
     
        this.http.get("/api/home/" + this.useremail + "/Article/" + this.articleId)
          .subscribe((res: Response) => {
            this.article = res.json()[0];
            console.log("Article is content" + this.article);
          });
      }); 
    
  }
  onCreateEvent() {

    

    this.event.eventArticle = this.article;

    if (this.event.eventName != 'undefined' && this.event.eventDate!=null && this.event.address != 'undefined' ) {

      this.http.get("/api/home/events")
        .subscribe((res: Response) => {
          console.log(res.json());
          this.events = res.json();
          var ind = 0;
          for (let a of this.events) {
            if (a.eventId > ind) {
              ind = a.eventId;

            }
          }
          this.max = ind;
          this.event.eventId = this.max + 1;
          console.log("id max is" + this.max);

          this.http.post("/api/home/PostEvent", this.event)
            .subscribe((res: Response) => {
              console.log(res);
              console.log("After post method");
              this.router.navigate(['/homepage'], { queryParams: { foo: this.useremail } });
            });
        });

    }
  }

}
