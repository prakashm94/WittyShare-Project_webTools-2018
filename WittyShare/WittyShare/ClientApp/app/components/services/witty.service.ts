import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable()
export class WittyService {
  private getUrl: string = "http://localhost:63465/api/hotel";
  private postUrl: string = "/api/hotel/Post01";
  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ];
  }
  getAllHotels() {
    return [
      { id: 'data/hotelbooking.json', name: 'Asp.Net' }
    ];
  }

 

  postJson() {
    var json = JSON.stringify({});
    var params = 'json=' + json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:63465/api/hotel', params, { headers: headers }).map(res => res.json());
  }


}
