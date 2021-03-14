import { Component, OnInit } from '@angular/core';
import { SpringApiService } from '../../services/spring-api.service';
import { NewSaved } from '../../config/NewSaved';
import { Router } from '@angular/router';


@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {

  resultList: NewSaved[];
  visible: boolean = true;

  constructor(
    private springApiService: SpringApiService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.springApiService.getAllNews()
      .subscribe(result => {
        this.visible = false;
        this.resultList = result;
      }, err => {
        console.log(err);
      })
  }

  delete(event: String, theId: number): void{
    this.springApiService.deleteNew(theId)
      .subscribe(result => {
        console.log(result);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/saved']);
        })
      }, err => {
        console.log(err);
      });
  }

}
