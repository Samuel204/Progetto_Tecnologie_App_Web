import { Component, Renderer2, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {AuthenticationService} from "../../services/authentication.service";

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
export class AdminComponent {

  userArray: any[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((res) => {
      this.userArray = (res as any).data;
    });
  }

  deleteUser(id: string){
    this.authService.deleteUser(id);
  }

}