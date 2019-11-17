import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Person } from '../models/index';
import { Article } from '../models/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: Http) { }
  articles: Array<Article> = new Array();
  max: number;
  article: Article = new Article(null);
  user: Person = new Person(null);
  useremail: string;
  image: any;
  imageElement?: HTMLImageElement;
  imageFile?: File;
  selectedFile = null;
  url: string;
  height = 0;
  width = 0;
  showTextObject = false;
  public topics = [
    { value: 'Business & Finance', display: 'Business & Finance' },
    { value: 'Technology', display: 'Technology' },
    { value: 'Mathematics', display: 'Mathematics' },
    { value: 'Sports & Games', display: 'Sports & Games' },
    { value: 'Science & Nature', display: 'Science & Nature' },
    { value: 'Arts', display: 'Arts' },
    { value: 'Food & Drink', display: 'Food & Drink' },
    { value: 'Miscellaneous', display: 'Miscellaneous' }
  ];
  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        let p = params['foo'];
        this.useremail = p;
        console.log("Article List in email" + this.useremail);
      });
    this.http.get("/api/home/persons/" + this.useremail)
      .subscribe((res: Response) => {
        console.log("Person" + res.json());
        this.user = res.json()[0];
        console.log("user name display from server" + this.user.fullname);
        this.article.creator = new Person(this.user);
      });
  }

  onCreateArticle() {
    if (this.article.content != 'undefined' && this.article.creator != null && this.article.image != 'undefined' && this.article.title != 'undefined' && this.article.patentStatus != null && this.article.categories != null && this.article.categories != 'undefined') {
      this.http.get("/api/home/articles")
        .subscribe((res: Response) => {
          console.log(res.json());
          this.articles = res.json();
          var ind = 0;
          for (let a of this.articles) {
            if (a.articleId > ind) {
              ind = a.articleId;
            }
          }
          this.max = ind;
          this.article.articleId = this.max + 1;
          console.log("id max is" + this.max);
          this.onCreate(this.max + 1);
        });
    }
  }

  onCreate(max: number) {
  //  console.log("Create method max email" + this.article.creator.email);


    this.http.post("/api/home/PostArticle", this.article)
      .subscribe((res: Response) => {
        console.log(res);
        this.router.navigate(['/homepage'], { queryParams: { foo: this.useremail } });
      });
  }

  //Image experimentation

  addImage(event) {
    this.selectedFile = event.target.files[0];
    console.log(event);
    if (event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      this.url = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      this.article.image = event.target.files[0];
      console.log(typeof this.image);
      this.height = 200;
      this.width = 200;
      console.log("url is " + this.url);
    }
  }
  addTextArea() {
    this.showTextObject = true;
  }

}






//import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute, Router, Params } from '@angular/router';
//import { Person } from '../models/index';
//import { Article } from '../models/index';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

//@Component({
//  selector: 'app-createarticle',
//  templateUrl: './createarticle.component.html',
//  styleUrls: ['./createarticle.component.css']
//})
//export class CreatearticleComponent implements OnInit {

//  constructor(private route: ActivatedRoute,private router: Router, private http: Http) { }
//  articles: Array<Article> = new Array();
//  max: number;
//  article: Article = new Article(null);
//  user: Person = new Person(null);
//  useremail: string;
//  image: any;
//  imageElement?: HTMLImageElement;
//  imageFile?: File;
//  selectedFile = null;
//  url: string;
//  height = 0;
//  width = 0;
//  showTextObject = false;
//  public topics = [
//    { value: 'cs', display: 'Computer Science' },
//    { value: 'bio', display: 'Biology' },
//    { value: 'chem', display: 'Chemistry' },
//    { value: 'eng', display: 'Engineering' },
//    { value: 'phy', display: 'Physics' }
//  ];
//  ngOnInit() {
//    this.route
//      .queryParams
//      .subscribe(params => {
//        let p = params['foo'];
//        this.useremail = p;
//        console.log("Article List in email" + this.useremail);
//      });

//    this.http.get("/api/home/persons/" + this.useremail)
//      .subscribe((res: Response) => {
//        console.log("Person" + res.json());
//        this.user = res.json();
//        this.article.creator = this.user;
//      });
//  }

//  onCreateArticle() {
    
//    this.http.get("/api/home/articles")
//      .subscribe((res: Response) => {
//        console.log(res.json());
//        this.articles = res.json();
//        var ind = 0;
//        for (let a of this.articles) {
//          if (a.articleId > ind) {
//            ind = a.articleId;
//          }
//        }
//        this.max = ind;
//        this.article.articleId = this.max + 1;
//        console.log("id max is" + this.article.articleId);

//        this.http.post("/api/home/PostArticle", this.article)
//          .subscribe((res: Response) => {
//            console.log("sasucess"+res);
//            console.log(this.article.creator);
//            this.router.navigate(['/homepage'], { queryParams: { foo: this.useremail } });
//          });

//      });
//    //this.http.get("/api/home/articles")
//    //  .subscribe((res: Response) => {
//    //    console.log(res.json());
//    //    this.articles = res.json();
//    //    var ind = 0;
//    //    for (let a of this.articles) {
//    //      if (a.articleId > ind) {
//    //        ind = a.articleId;
//    //      }
//    //    }
//    //    this.max = ind;
//    //    this.article.articleId = this.max + 1;
//    //    console.log("id max is" + this.max + this.article.articleId + this.article.title);
//    //    this.http.post("/api/home/PostArticle", this.article)
//    //      .subscribe((res: Response) => {
//    //        console.log(res);
//    //        console.log("log" + this.article.creator);
//    //        this.router.navigate(['/homepage'], { queryParams: { foo: this.useremail } });
//    //      });
//    //  });
//  }

//  //Image experimentation

//  addImage(event) {
//    this.selectedFile = event.target.files[0];
//    console.log(event);
//    if (event.target.files[0]) {
//      var reader = new FileReader();
//      reader.onload = (event: any) => {
//        this.url = event.target.result;
//      };
//      this.url = event.target.files[0];
//      reader.readAsDataURL(event.target.files[0]);
//      this.article.image = event.target.files[0];
//      console.log(typeof this.image);
//      this.height = 200;
//      this.width = 200;
//      console.log("url is " + this.url);
//    }
//  }
//  addTextArea() {
//    this.showTextObject = true;
//  }

//}
