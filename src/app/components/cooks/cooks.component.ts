import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-cooks',
  templateUrl: './cooks.component.html',
  styleUrls: ['./cooks.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ]
})
export class CooksComponent implements OnInit {

  isNotificationVisible: boolean = false;
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
    this.authService.getAllKitchenOrders().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  showNotification() {
    this.isNotificationVisible = true;

    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 2000);
  }

  openDetailModal(){
    const modalElement = this.el.nativeElement.querySelector('#detailModal');
    this.renderer.removeClass(modalElement, 'hidden');
  }

  closeDetailModal() {
    const modalElement = this.el.nativeElement.querySelector('#detailModal');
    this.renderer.addClass(modalElement, 'hidden');
  }

  queueRows = [ "Tavolo 1", "Tavolo 2"];

  addRow() {
    const randomNum = Math.floor(Math.random() * 9) + 1;
    this.queueRows.push("Tavolo "+randomNum.toString());
  }

  removeRow() {
    if (this.queueRows.length > 0) {
      this.queueRows.splice(0, 1);
    }
  }

  deliver() {
    this.showNotification();
    this.removeRow();
  }

}
