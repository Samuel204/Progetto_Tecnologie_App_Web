import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsAdmin: boolean = false;

  constructor(
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.isAdmin();
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    window.location.reload();
  }

  isAdmin(){
    interface RoleElement {
      _id: string;
      role: string;
    }

    if (this.authService.getUserDataFromToken()?.subscribe) {
      this.authService.getUserDataFromToken()!.subscribe(
        data => {
          let roles = (data as any).user.roles;
          if(roles.some((element: RoleElement) => element.role === "cashier")){
            this.userIsAdmin = true;
          }
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
