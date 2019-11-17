import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Person } from '../models/index';
import { Article } from '../models/index';
import { Comment } from '../models/index';
import { Event } from '../models/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-articledetail',
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.css']
})
export class ArticledetailComponent implements OnInit {
  article: Article = new Article(null);
  user: Person = new Person(null);
  useremail: string;
  articleId: number;
  downvote: boolean = false;
  rating: boolean = false;
  vote: boolean = false;
  commentDataList: Array<string>= new Array<string>();
  str: string;
  commentList: Array<Comment> = new Array<Comment>();
  comment: Comment = new Comment(null);
  favFlag: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private http: Http) {
   
    this.route
      .queryParams
      .subscribe(params => {
        let p = params['foo'];
        this.useremail = p;
        console.log("Article List in email" + this.useremail);
        let id = params['bar'];
        this.articleId = id;
        console.log("Article Id is" + this.articleId);
        this.http.get("/api/home/" + this.useremail + "/Article/" + this.articleId)
          .subscribe((res: Response) => {
            console.log(res.json()[0]);
            this.article = res.json()[0];
            console.log("Article is content" + this.article.articleId + this.article.comments);
          });
      });
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        let p = params['foo'];
        this.useremail = p;
        console.log("Article List in email" + this.useremail);
        let id = params['bar'];
        this.articleId = id;
        console.log("Article Id is" + this.articleId);
        this.http.get("/api/home/" + this.useremail + "/Article/" + this.articleId)
          .subscribe((res: Response) => {
            console.log(res.json()[0]);
            this.article = res.json()[0];
            console.log("Article is content" + this.article.articleId + this.article.comments);
          });
      });
    this.http.get("/api/home/persons/" + this.useremail)
      .subscribe((res: Response) => {
        console.log(res.json());
        this.user = res.json()[0];
        console.log("user is" + this.user.fullname);
      });
   

   
  }

  addComment(str:string) {
    this.comment.commentedBy = this.user;
    this.comment.verified = false;
    this.comment.commentData = this.str;
    if (this.article.comments == null) {
      this.article.comments = new Array<Comment>();
    }
    //console.log("Favourite Details" + this.str);
    this.article.comments.push(this.comment);
    this.PostData();
    this.str = "";
  }

  onFavourite() {

    if (this.article.favouritedBy == null) {
      this.article.favouritedBy = new Array<Person>();
    }
    for (let ppl of this.article.favouritedBy) {
      if (ppl.email == this.user.email) {
        console.log("fav ppl ");
        this.favFlag = true;
        break;
      }
    }
    if (this.favFlag == false) {
      this.article.favouritedBy.push(this.user);
      this.PostData();
    }



  }


  PostData() {
    this.http.post("/api/home/PostArticle/", this.article)
      .subscribe((res: Response) => {
        console.log(res);
        console.log("Comment Length" + this.article.comments.Length);

        this.http.get("/api/home/" + this.useremail + "/Article/" + this.articleId)
          .subscribe((res: Response) => {
            this.article = res.json()[0];
            console.log("Article is content" + this.article.articleId);
          });
      });
  }

  onCreateEvent() {
    this.router.navigate(['/createevent'], { queryParams: { foo: this.useremail, bar: this.articleId } });
    this.PostData();
  }

  addAmazing() {
    if (this.rating == false) {
      this.article.amazing = this.article.amazing + 1;
      this.PostData();
      this.rating = true;
    }
  }

  addPoor() {
    if (this.rating == false) {
      this.article.poor = this.article.poor + 1;
      this.PostData();
      this.rating = true;
    }
  }
  addGood() {
    if (this.rating == false) {
      this.article.good = this.article.good + 1;
      this.PostData();
      this.rating = true;
    }
  }
  viewProfile(personId: number) {
    this.router.navigate(['/viewprofile'], { queryParams: { foo: this.useremail, bar: personId } });
  }

  upVote(comment: Comment) {
    console.log("upvote value check" + this.vote + this.commentDataList.indexOf(comment.commentData));
    if (comment.commentedBy.email != this.useremail && (this.commentDataList.indexOf(comment.commentData) == -1)) {
      for (let c of this.article.comments) {
        if (c == (comment)) {
          console.log("inside the equal comment method");
          c.upVote = c.upVote + 1;
          console.log("upvote increased value" + c.upVote);

          if (this.useremail == this.article.creator.email) {
            c.verified = true;
          }
          this.PostData();
          this.commentDataList.push(comment.commentData);
        }
      }
    }
  }

  downVote(comment: Comment) {
    console.log("downvote value check" + this.vote + this.commentDataList.indexOf(comment.commentData));
    if (comment.commentedBy.email != this.useremail && (this.commentDataList.indexOf(comment.commentData) == -1)) {
      for (let c of this.article.comments) {
        if (c == (comment)) {
          console.log("inside the equal comment method");
          c.downVote = c.downVote + 1;
          console.log("downvote increased value" + c.downVote);

          //if (this.useremail == this.article.creator.email) {
          //  c.verified = true;
          //}
          this.PostData();
          this.commentDataList.push(comment.commentData);
        }
      }
    }
  }

  //downVote(comment: Comment) {

  //  if (this.vote == false && comment.commentedBy.email != this.useremail) {
  //    for (let c of this.article.comments) {
  //      if (c == (comment)) {
  //        console.log("inside the equal comment method");
  //        c.downVote = c.downVote + 1;
  //        console.log("downvote increased value" + c.downVote);
  //        this.PostData();
  //        this.vote = true;
  //      }
  //    }
  //  }
  //}

}
