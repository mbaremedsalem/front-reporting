import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import { TokenModel } from 'src/app/model/token.model';
import * as moment from "moment";


const API_AUTH_URL = environment.baseUrlAuth + '/login';
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


  // Authentication/Authorization
  login(username: string, password: string) {
    this.logout();
    return this.http.post<{ token: string }>(API_AUTH_URL, {username, password})
      .pipe(
        map(authenticateUser => {
          const token: TokenModel = this.decode(authenticateUser.token);


          console.log(token.exp);
          let user = new User();
          user.username = token.sub;
          user.email = token.email;
          user.fullname = token.fullname;
          user.id = token.id;
          user.appRoles = token.roles;
          localStorage.setItem('token', authenticateUser.token);
          localStorage.setItem('expire_at', JSON.stringify(token.exp))
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.currentUserSubject.next(user);

          return user;

        }));

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
