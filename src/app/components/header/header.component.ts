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
    // Check if the user is an admin
    if(this.isLoggedIn()){
        this.isAdmin();
    }
  }

  // Method to check if the user is logged in
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(): void {
    // Call the logout method from AuthenticationService
    this.authService.logout();
    // Reload the window after logout
    window.location.reload();
  }

  // Method to check if the user has an admin role
  isAdmin(){
    // Define an interface for the roles
    interface RoleElement {
      _id: string;
      role: string;
    }

    // Check if the user data is available in the token
    if (this.authService.getUserDataFromToken()?.subscribe) {
      // Subscribe to the user data observable
      this.authService.getUserDataFromToken()!.subscribe(
        data => {
          // Extract the roles from the user data
          let roles = (data as any).user.roles;
          // Check if any role is "cashier" to determine if the user is an admin
          if(roles.some((element: RoleElement) => element.role === "cashier")){
            this.userIsAdmin = true;
          }
        },
        error => {
          // Log an error if there is an issue fetching user data
          console.error('Error occurred:', error);
        }
      );
    } else {
      // Log an error if something goes wrong when fetching user data
      console.error('Something went wrong when fetching the data!');
    }
  }

}
