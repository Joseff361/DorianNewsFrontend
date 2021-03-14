import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../config/Login';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { JwtCredentials } from 'src/app/config/JwtCredentials';
import { MessageService } from '../../services/message.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('fform') loginFormDirective;
  loginForm: FormGroup;
  login: Login;
  errorMessage: String;

  formErrors = {
    'customerName': '',
    'password': ''
  };

  validationMessages = {
    'customerName': {
      'required' : 'Username is required.',
      'minlength': 'Username must be at least 6 characters long.',
      'maxlength': 'Username cannot be more than 25 characters long.'
    },
    'password': {
      'required' : 'Password is required.',
      'minlength': 'Password must be at least 6 characters long.',
      'maxlength': 'Password cannot be more than 25 characters long.'
    }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)] ]
    });

    this.loginForm.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 
  }

  // Update
  onValueChanged(data?: any) { //parameter is optional
    if (!this.loginForm) { return; } //has been created?
    
    const form = this.loginForm;
    
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {//make sure that the object contain the property
        
        this.formErrors[field] = ''; // clear previous error message (if any)

        const control = form.get(field); //const form = this.feedbackForm;

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) { 
            if (control.errors.hasOwnProperty(key)) { // control = form.get(field);
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void {
    this.login = this.loginForm.value;
    //console.log(this.login);

    this.authService.login(this.login)
      .subscribe(credentials => {

        this.loginForm.reset({
          username: '',
          password: '',
        });
    
        this.loginFormDirective.resetForm(); //ensure a completely reset

        this.saveCredentials(credentials);

        this.messageService.sendMessage(this.tokenService.getUserName());

        this.route.navigate(['/home']);
        //console.log(credentials)

      }, err => {
        this.errorMessage = "User not found in the BBDD";
        setTimeout (() => {
          this.errorMessage = null;
       }, 3000);
      });
  }

  saveCredentials(credentials: JwtCredentials): void{
    this.tokenService.setToken(credentials.token);
    this.tokenService.setUserName(credentials.customerName);
    this.tokenService.setAuthorities(credentials.authorities);
  }

}
