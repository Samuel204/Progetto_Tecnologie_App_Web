import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {interval, Observable, Subscription, throwError} from 'rxjs';
import { AuthenticationService } from "../../services/authentication.service";
import * as apiData from "../../api_interfaces";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ]
})
export class AdminComponent implements OnInit {

  isNotificationVisible: boolean = false;
  username: string = "";
  users: apiData.User[] = [];
  private userDataSubscription: Subscription | undefined;


  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    // Fetch user data from the token and set the username
    this.authService.getUserDataFromToken()?.subscribe(
      (data: any) => {
        this.username = data.username;
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );

    // Fetch all users
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token not available.');
      return;
    }
    if (this.authService.getAllUsers() instanceof Observable) {
      this.userDataSubscription = this.authService.getAllUsers()!.subscribe(
        (data: any) => {
          if (data && data.data && Array.isArray(data.data)) {
            this.users = data.data.map((user: apiData.User) => ({
              _id: user._id,
              username: user.username,
              email: user.email,
              isAdmin: user.isAdmin,
              roles: user.roles
            }));
          } else {
            console.error('Invalid data received:', data);
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      console.error('getAllUsers() did not return a valid Observable.');
    }

  }

  deleteUser(id: string): void {
    this.authService.deleteUser(id).subscribe(
      () => {
        // User deleted successfully, now fetch the updated list of users
        this.fetchAllUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }


}
