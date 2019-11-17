import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Person } from '../models/index';
import { Article } from '../models/index';
import { Event } from '../models/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, private http: Http, private route: ActivatedRoute) {
    
  }
    category: string;
    search: string;
    user: Person = new Person(null);
    useremail: string;
    favList: Array<Article> = new Array();
    articleList: Array<Article> = new Array();
    allArticleList: Array<Article> = new Array();
    eventList: Array<Event> = new Array();
    type: string;
    flag: boolean = false;
    event: Event = new Event(null);
    subContent: string;
    peopleAttend: Array<Person> = new Array();
    public types = [
      { value: 'Article', display: 'Article' },
      { value: 'Event', display: 'Event' },
      { value: 'MyArticle', display: 'My Article' },
      { value: 'MyEvent', display: 'My Event' },
      { value: 'MyFavourite', display: 'My Favourite' }
    ];
    ngOnInit() {

       

        this.route
            .queryParams
            .subscribe(params => {
                let p = params['foo'];
                this.useremail = p;
        });

        this.http.get("/api/home/persons/" + this.useremail)
          .subscribe((res: Response) => {
            console.log(res.json());
            this.user = res.json()[0];
         //   console.log("user is" + this.user.fullname);
          });
        this.http.get("/api/home/articles")
          .subscribe((res: Response) => {
            console.log(res.json());
            this.articleList = res.json();
            this.allArticleList = this.articleList;
            
           // console.log("articleList is" + this.articleList[0].title);
          });
        this.http.get("/api/home/events")
          .subscribe((res: Response) => {
            console.log(res.json());
            this.eventList = res.json();
        //    console.log("eventList is" + this.eventList[0].eventName);
          });
    }

    onChangeCategory(category: string) {
      if (category == 'All') {
        if (this.type == 'Article') {
          this.http.get("/api/home/articles")
            .subscribe((res: Response) => {
              console.log(res.json());
              this.articleList = res.json();
              //     console.log("articleList is" + this.articleList[0].title);
            });
        }
        else if (this.type == 'Event') {
          this.http.get("/api/home/events")
            .subscribe((res: Response) => {
              console.log(res.json());
              this.eventList = res.json();
              //  console.log("eventList is" + this.eventList[0].eventName);
            });
        }
        else if (this.type == 'MyEvent') {
          this.http.get("/api/home/events/" + this.useremail)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.eventList = res.json();
              //  console.log("eventList is" + this.eventList[0].eventName);
            });
        }
        else if (this.type == 'MyArticle') {
          this.http.get("/api/home/articles/" + this.useremail)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.articleList = res.json();
              //     console.log("articleList is" + this.articleList[0].title);
            });

        }
        else if (this.type == 'MyFavourite') {
          this.http.get("/api/home/articles/" )
            .subscribe((res: Response) => {
              console.log(res.json());
              this.favList = res.json();
              this.articleList = new Array();
              for (let f of this.favList) {
                for (let g of f.favouritedBy) {
                  console.log("email of "+g.email+"  "+this.useremail);
                  if (g.email == this.useremail) {
                    console.log("ar");
                    this.articleList.push(f);
                    break;
                  }
                }
              }
                   console.log("articleList fav is" + this.articleList);
            });
        }
      }
        else {
          if (this.type == 'Article') {
            this.http.get("/api/home/ArticleCategory/" + this.user.email + "/" + category)
              .subscribe((res: Response) => {
                console.log(res.json());
                this.articleList = res.json();
              });
          }
          else if (this.type == 'Event') {
            this.http.get("/api/home/EventCategory/" + this.user.email + "/" + category)
              .subscribe((res: Response) => {
                console.log(res.json());
                this.eventList = res.json();
              });
          }
          else if (this.type == 'MyEvent') {
            this.http.get("/api/home/events/" + this.useremail + "/" + category)
              .subscribe((res: Response) => {
                console.log(res.json());
                this.eventList = res.json();
                //  console.log("eventList is" + this.eventList[0].eventName);
              });
          }
          else if (this.type == 'MyArticle') {
            this.http.get("/api/home/articles/" + this.useremail + "/" + category)
              .subscribe((res: Response) => {
                console.log(res.json());
                this.articleList = res.json();
                //     console.log("articleList is" + this.articleList[0].title);
              });
        }
          else if (this.type == 'MyFavourite') {
            this.http.get("/api/home/articles/" )
              .subscribe((res: Response) => {
                console.log(res.json());
                this.favList = res.json();
                this.articleList = new Array();
                for (let f of this.favList) {
                  for (let g of f.favouritedBy) {
                    console.log("email of " + g.email + "  " + this.useremail);
                    if (g.email == this.useremail && f.categories.indexOf(category) != -1) {
                      console.log("ar");
                      this.articleList.push(f);
                      break;
                    }
                  }
                }
                //     console.log("articleList is" + this.articleList[0].title);
              });
          }
        }
      }

    onChangeType(type: string) {
      if (type == '' || type == "undefined" || type == null) {
        this.type = "Article";
      }

      if (this.category == 'All') {
        if (this.type == 'Article') {
          this.http.get("/api/home/articles")
            .subscribe((res: Response) => {
              console.log(res.json());
              this.articleList = res.json();
             // console.log("articleList is" + this.articleList[0].title);
            });
        }
        else if (this.type == 'Event') {
          this.http.get("/api/home/events")
            .subscribe((res: Response) => {
              console.log(res.json());
              this.eventList = res.json();
             // console.log("eventList is" + this.eventList[0].eventName);
            });
        }
        else if (this.type == 'MyEvent') {
          this.http.get("/api/home/events/" + this.useremail)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.eventList = res.json();
              //  console.log("eventList is" + this.eventList[0].eventName);
            });
        }
        else if (this.type == 'MyArticle') {
          this.http.get("/api/home/articles/" + this.useremail)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.articleList = res.json();
              //     console.log("articleList is" + this.articleList[0].title);
            });
        }

        else if (this.type == 'MyFavourite') {
          this.http.get("/api/home/articles/" )
            .subscribe((res: Response) => {
              console.log(res.json());
              this.favList = res.json();
              this.articleList = new Array();
              for (let f of this.favList) {
                for (let g of f.favouritedBy) {
                  if (g.email == this.useremail) {
                    this.articleList.push(f);
                    break;
                  }
                }
              }
              //     console.log("articleList is" + this.articleList[0].title);
            });
        }

      }

      else {
        if (type == 'Article') {
          this.http.get("/api/home/ArticleCategory/" + this.user.email + "/" + this.category)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.articleList = res.json();
            });
        }
        else if (type == 'Event') {
          this.http.get("/api/home/EventCategory/" + this.user.email + "/" + this.category)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.eventList = res.json();
            });
        }
        else if (this.type == 'MyEvent') {
          this.http.get("/api/home/events/" + this.useremail + "/" + this.category)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.eventList = res.json();
              //  console.log("eventList is" + this.eventList[0].eventName);
            });
        }
        else if (this.type == 'MyArticle') {
          this.http.get("/api/home/articles/" + this.useremail + "/" + this.category)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.articleList = res.json();
              //     console.log("articleList is" + this.articleList[0].title);
            });
        }
        else if (this.type == 'MyFavourite') {
          this.http.get("/api/home/articles/" + this.useremail + "/" + this.category)
            .subscribe((res: Response) => {
              console.log(res.json());
              this.favList = res.json();
              this.articleList = new Array();
              for (let f of this.favList) {
                for (let g of f.favouritedBy) {
                  if (g.email == this.useremail) {
                    this.articleList.push(f);
                    break;
                  }
                }
              }
              //     console.log("articleList is" + this.articleList[0].title);
            });
        }
      }
    }
    onNewArticle() {
      this.router.navigate(['/createarticle'], { queryParams: { foo: this.useremail } });
    }

    onArticleDetails(id: number) {
      console.log("article id in articledetails call page:"+id);
          this.router.navigate(['/articledetail'], { queryParams: { foo: this.useremail, bar: id } });        
    }
    onAddPeople(eventId: number) {

      this.http.get("/api/home/" + this.useremail + "/Event/" + eventId)
        .subscribe((res: Response) => {
          this.event = res.json()[0];
          console.log("Article is content" + this.event.eventId);
          console.log("user is content" + this.user.email);
          //Have doubt if this works
          // if (this.event.peopleAttending.find(x => (x == this.user)) != null) {
          if (this.event.peopleAttending == null) {
            this.event.peopleAttending = new Array();
          }
          for (let ppl of this.event.peopleAttending) {
            if (ppl.email == this.user.email) {
              console.log("event ppl " + this.event.peopleAttending.indexOf(this.user));
              this.flag = true;
              break;
            }

          }
          if (this.flag == false) {

            this.event.peopleAttending.push(this.user);

            console.log("length of people attending: " + this.event.peopleAttending.length);
            //Editing event
            this.http.post("/api/home/PostEvent", this.event)
              .subscribe((res: Response) => {
                console.log(res);
                this.http.get("/api/home/events")
                  .subscribe((res: Response) => {
                    console.log(res.json());
                    this.eventList = res.json();
                    this.onChangeCategory(this.category);
                    //    console.log("eventList is" + this.eventList[0].eventName);
                  });
                this.router.navigate(['/homepage'], { queryParams: { foo: this.useremail } });
              });
          }
        }); 
    }
    viewProfile(personId:number) {
      this.router.navigate(['/viewprofile'], { queryParams: { foo: this.useremail, bar: personId } });    
    }

    onEditProfile() {
      this.router.navigate(['/editprofile'], { queryParams: { foo: this.useremail } });    
    }

    //onViewLocation(eventId: number) {
    //  this.http.get("/api/home/" + this.useremail + "/Event/" + eventId)
    //    .subscribe((res: Response) => {
    //      this.event = res.json()[0];
    //      this.router.navigate(['/eventdetail'], { queryParams: { foo: this.useremail, lat: this.event.lattitude, lon: this.event.longitude } }); 
    //    });
    
    //}

    


    onSearch(sea: string) {

      this.articleList = new Array();
      for (let art of this.allArticleList) {
        console.log("for loop" + art.title + "  " + sea);
        //if(art.title==sea)  // this is working for equal
        if (!art.title.search(sea)) {
          console.log("if loop");
          this.type = "Article";
          this.articleList.push(art);
        }
      }
    }
}
