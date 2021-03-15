import { Injectable } from '@angular/core';
import { backendURL } from '../config/shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../config/News';
import { NewSaved } from '../config/NewSaved';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class SpringApiService {

  theCleanNew: News;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAllNews(): Observable<NewSaved[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      })
    };
    return this.http.get<NewSaved[]>(backendURL, httpOptions);
  }

  saveNew(theNew: News): Observable<News>{

    this.theCleanNew = this.cleanString(theNew);

    console.log(this.theCleanNew);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      })
    };

    return this.http.post<News>(backendURL,this.theCleanNew, httpOptions);
  }

  deleteNew(theId: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenService.getToken()}`
      })
    };

    return this.http.delete(backendURL + "/" + theId, httpOptions);
  }

  cleanString(theNew: News): News{

    for (let key of Object.keys(theNew)){ 
      if(theNew[key] != null && typeof theNew[key] == 'string'){
        theNew[key] = theNew[key].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      }  
    }
    return theNew;
  }

}
