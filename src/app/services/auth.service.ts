import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { backendURLAuth } from '../config/shared';
import { JwtCredentials } from '../config/JwtCredentials';
import { Login } from '../config/Login';
import { SignUp } from '../config/SignUp';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login(loginUser: Login): Observable<JwtCredentials> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<JwtCredentials>(backendURLAuth + '/login', loginUser, httpOptions);
  }

  public register(signupUser: SignUp): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(backendURLAuth + '/signin', signupUser, httpOptions);
  }
}
