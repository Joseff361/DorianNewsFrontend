import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiInfo } from '../config/shared';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlinesByCountry(country: String): Observable<any[]>{
    return this.http.get<any[]>(apiInfo.prefixURL + `top-headlines?country=${country}` + apiInfo.suffiURL);  
  }

  getTopHeadlinesByCategory(category: String): Observable<any[]>{
    return this.http.get<any[]>(apiInfo.prefixURL + `top-headlines?category=${category}` + apiInfo.suffiURL);  
  }

  getTopHeadlinesByCountryANDCategory(country: String, category: String): Observable<any[]>{
    return this.http.get<any[]>(apiInfo.prefixURL + `top-headlines?country=${country}&category=${category}` + apiInfo.suffiURL);  
  }

  getTopHeadlinesByKeyword(keyword: String): Observable<any[]>{
    return this.http.get<any[]>(apiInfo.prefixURL + `top-headlines?q=${keyword}` + apiInfo.suffiURL);  
  }

}
