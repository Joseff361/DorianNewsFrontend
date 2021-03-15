import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  messages: any[] = [];
  subscription: Subscription;

  v_signup: String = "";
  v_login: String = "";
  v_logout: String = "none";
  v_user: String = "none";
  customerName: String = "";

  constructor(
    private messageService: MessageService,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {

    //subscribe to home component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        this.customerName = message.text;
        this.v_signup = "none";
        this.v_login = "none";
        this.v_logout = "";
        this.v_user = "";
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });

    if(this.tokenService.getToken() != null){
        this.customerName = this.tokenService.getUserName();
        this.v_signup = "none";
        this.v_login = "none";
        this.v_logout = "";
        this.v_user = "";
    }

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  
  logOut(event: any){
    this.tokenService.logOut();
    this.v_signup = "";
    this.v_login = "";
    this.v_logout = "none";
    this.v_user = "none";
    this.customerName = "";
    Swal.fire({
      title: 'See ya!',
      icon: 'success',
    })
  }
}
