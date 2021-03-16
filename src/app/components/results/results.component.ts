import { Component, OnInit, Input } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';
import { SpringApiService } from '../../services/spring-api.service';
import { News } from '../../config/News';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  @Input() country: String = '';
  @Input() category: String = '';
  @Input() keyword: String = '';
  
  visible: boolean = false;
  newsapi_d: boolean = false;
  theNew: News;


  resultList: any[];

  constructor(
    private newsApiService: NewsApiService,
    private springApiService: SpringApiService
  ) { }

  ngOnInit(): void {
  }


  // UPDATE THE LIST OF NEWS
  ngOnChanges(){

    this.newsapi_d = false;

    if(this.category != 'none' && this.category != undefined && this.country != 'none' && this.country != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByCountryANDCategory(this.country, this.category)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
        }, err => {
          this.newsapi_d = true;
        });  
    }

    if(this.country != 'none' && this.country != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByCountry(this.country)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
        }, err => {
          this.newsapi_d = true;
        }); 
    }

    if(this.category != 'none' && this.category != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByCategory(this.category)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
        },err => {
          this.newsapi_d = true;
        }); 
    }

    if(this.keyword != '' && this.keyword != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByKeyword(this.keyword)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
        }, err => {
          this.newsapi_d = true;
        }); 
    }
  }

  // SAVE THE NEW ON THE BACKEND
  saveNew(event: String, theNew: any): void{
    
    //console.log(theNew);
    
    this.theNew = new News(0, theNew.source.name, theNew.author, theNew.title, theNew.description,
      theNew.url, theNew.urlToImage, theNew.publishedAt, theNew.content);

    //console.log(this.theNew);
    this.springApiService.saveNew(this.theNew)
      .subscribe(response => {
        Swal.fire({
          title: 'New saved successfully',
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      }, err => {
        Swal.fire({
          title: 'You have to be logged to save news',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
        console.log(err);
      });
  }

}
