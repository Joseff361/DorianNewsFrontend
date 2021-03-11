import { Component, OnInit, Input } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';



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

  resultList: any[];

  constructor(
    private newsApiService: NewsApiService
  ) { }

  ngOnInit(): void {
  }

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

}
