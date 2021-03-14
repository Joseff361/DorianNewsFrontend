import { Component, OnInit } from '@angular/core';
import { SpringApiService } from '../../services/spring-api.service';
import { NewSaved } from '../../config/NewSaved';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
    
      Swal.fire({

        title: 'Are you sure?',
        text: 'You will not be able to recover this new file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'

      }).then((result) => {

        if (result.value) {

          this.springApiService.deleteNew(theId)
            .subscribe(result => {
              console.log(result);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/saved']);
              }) 
            }, err => {
              console.log(err);
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your file is safe :)',
            'error'
          )
        }
      })



  }

}
