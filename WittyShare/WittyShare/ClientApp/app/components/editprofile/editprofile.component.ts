import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Person } from '../models/index';
import { Article } from '../models/index';
import { Event } from '../models/index';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(private router: Router, private http: Http, private route: ActivatedRoute) { }
  person: Person = new Person(null);
  personId: number;
  user: Person = new Person(null);
  useremail: string;
  skill: string;
  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        let p = params['foo'];
        this.useremail = p;
       // console.log(this.user.email);
      });

    this.http.get("/api/home/persons/" + this.useremail)
      .subscribe((res: Response) => {
        console.log(res.json());
        this.person = res.json()[0];
        console.log("user is" + this.person.fullname + "   this email " + this.person.email);
      });

    //testing purpose comment after use
    //this.http.get("/api/home/po/Person/18")
    //  .subscribe((res: Response) => {
    //    console.log(res.json());
    //    this.person = res.json()[0];
    //    console.log("person name" + this.person.fullname)
    //  });
  }

  onSubmit() {
    if (this.person.fullname != 'undefined' && this.person.contact != 'undefined' && this.person.degree != null && this.person.email != 'undefined' && this.person.experience != null && this.person.gender != null && this.person.password != 'undefined' && this.person.profession != null && this.person.pic != null) {

      this.http.post("/api/home/PostPerson", this.person)
        .subscribe((res: Response) => {
          console.log(res);
          this.router.navigate(['/homepage'], { queryParams: { foo: this.person.email } });
        });
    }
  }

  AddSkill(skill: string) {
    if (this.person.skills == null) {
      this.person.skills = new Array<string>();
    }
    if (skill != null && skill!="") {
      this.person.skills.push(skill);
    }
    this.skill = "";
  }

}
