import { Component, Renderer2, ElementRef } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent {

  username: string = "";

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    if (this.authService.getUserDataFromToken()?.subscribe) {
      this.authService.getUserDataFromToken()!.subscribe(
        data => {
          this.username = (data as any).user.username;
        },
        error => {
          console.error('Error occurred:', error);
        }
      );
    } else {
      console.error('Something went wrong when fetching the data!');
    }
  }

}
