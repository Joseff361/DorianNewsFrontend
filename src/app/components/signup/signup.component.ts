import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUp } from '../../config/SignUp';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  signupFormToSend: SignUp;
  errorMessage: String;

  formErrors = {
    'customerName': '',
    'password': '',
    'name': '',
    'lastName': ''
  };

  validationMessages = {
    'customerName': {
      'required' : 'Customer Name is required.',
      'minlength': 'Customer Name must be at least 6 characters long.',
      'maxlength': 'Customer Name cannot be more than 25 characters long.'
    },
    'password': {
      'required' : 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    },
    'name': {
      'required' : 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'lastName': {
      'required' : 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    }
  };

  //Get access any of the child child DOM elements whitin my template
  @ViewChild('ffform') signupFormDirective;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
    ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

 createForm(): void {
    this.signupForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)] ],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });

    this.signupForm.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 

  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.signupForm) { return; } //has been created?
    
    const form = this.signupForm;
    
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {//make sure that the object contain the property
        
        this.formErrors[field] = ''; // clear previous error message (if any)

        const control = form.get(field); //const form = this.feedbackForm;

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) { // const control = form.get(field);
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.signupFormToSend = this.signupForm.value;
    console.log(this.signupFormToSend);

    this.authService.register(this.signupFormToSend)
      .subscribe(success => {

        console.log(success)

        this.signupForm.reset({
          customerName: '',
          password: '',
          name: '',
          lastName: ''
        });
        
        this.signupFormDirective.resetForm(); //ensure a completely reset

        this.route.navigate(['/login']);

      }, err => {
        this.errorMessage = "Costumer Name already exists";
        setTimeout (() => {
          this.errorMessage = null;
       }, 3000);
      })

    
    
  }
}
