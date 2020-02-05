import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  // API path
  basePath = 'http://localhost:7000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private httpClient: HttpClient,public router: Router){}

  
  register(user: User): Observable<any> {
  	let api = this.basePath + '/register-user';
    return this.httpClient.post(api, user).pipe(
        catchError(this.handleError)
    )
  }

  
  login(user: User) {  
    let api = this.basePath + '/login';
    return this.httpClient.post<any>(api, user);
  }  
 
 
  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn():boolean {
    let authToken = localStorage.getItem('access_token');    
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['login']);
    }
  }

  getUserProfile(id): Observable<any> {
     return this.httpClient.get(this.basePath + '/user-profile/' + id, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = 'Error Code: ' + error.status + '\nMessage: ' + error.message;
    }
    
    return throwError(msg);
  }
}

