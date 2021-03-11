import { Component, OnInit } from '@angular/core';
import { categories } from '../../config/shared';
import { countries } from '../../config/shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  countries: any[];
  categories: String[];
  c_country: String;
  c_category: String;
  t_keyword: String;

  constructor(  ) { }

  ngOnInit(): void {
    this.countries = countries;
    this.categories = categories;
  }
  categorySelected(choosenCategory: String) {
    this.c_category = choosenCategory;
  }

  countrySelected(choosenCountry: String) {
    this.c_country = choosenCountry;
  }

  keywordTyped(typedKeyword: String){
    this.t_keyword = typedKeyword;
  }
}
