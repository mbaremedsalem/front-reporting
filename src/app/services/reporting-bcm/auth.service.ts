import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import { TokenModel } from 'src/app/model/token.model';
import * as moment from "moment";
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/model/message.model';


const API_AUTH_URL = environment.baseUrlAuth + '/login';
const apiUrl = `${environment.mybaseurl}login/`;
const updatePasse = `${environment.mybaseurl}password/`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  
  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  login(credentials: any): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<User>(apiUrl, credentials, httpOptions);
    
  }

  changePassword(credentials: any): Observable<Message> {
   
    // const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.put<Message>(updatePasse, credentials);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('expire_at');
    this.currentUserSubject.next(null);

  }


  getExpiration() {
    const expiration = localStorage.getItem("expire_at")!;
    const expiresAt = JSON.parse(expiration);

    return moment.unix(expiresAt);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  public isLoggedIn() {


    console.log(this.getExpiration());
    // return moment().milliseconds()<this.getExpiration();
    return moment().isBefore(this.getExpiration());
  }

  private decode(token: string) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.log("error decoding token");
    }
  }
}
