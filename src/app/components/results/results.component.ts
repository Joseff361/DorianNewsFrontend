import { Component, OnInit, Input } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';
import { SpringApiService } from '../../services/spring-api.service';
import { News } from '../../config/News';


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

    if(this.category != 'none' && this.category != undefined && this.country != 'none' && this.country != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByCountryANDCategory(this.country, this.category)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
        });  
    }

    if(this.country != 'none' && this.country != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByCountry(this.country)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
        }); 
    }

    if(this.category != 'none' && this.category != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByCategory(this.category)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
        }); 
    }

    if(this.keyword != '' && this.keyword != undefined){
      this.visible = true;
      this.newsApiService.getTopHeadlinesByKeyword(this.keyword)
        .subscribe(result => {
          this.resultList = result;
          this.visible = false;
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
      .subscribe(response => console.log("Registro exitoso"), err => console.log(err));
  }

}
