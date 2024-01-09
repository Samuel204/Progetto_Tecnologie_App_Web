import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {AuthenticationService} from "../../services/authentication.service";
import * as apiData from "../../api_interfaces";

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
  queueRows: apiData.FoodOrder[] = [];
  tables: apiData.Table[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.authService.getUserDataFromToken()!.subscribe(
      data => {
        this.username = (data as any).user.username;
      },
      error => {
        console.error('Error occurred:', error);
      }
    );
    this.authService.getAllTables().subscribe(
      data => {
        this.tables = data.map((table=>({_id: table._id, name: table.name, n_seats: table.n_seats, occupied: table.occupied})));
        console.log(this.tables);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    )
    this.authService.getAllKitchenOrders().subscribe(
      data => {
        this.queueRows = (data as any).data.map(((order: apiData.FoodOrder)=>({_id: order._id, cod: order.cod, table: order.table, ready: order.ready, foods: order.foods, date: order.date})));
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

  addRow() {
    //const randomNum = Math.floor(Math.random() * 9) + 1;
    //this.queueRows.push("Tavolo "+randomNum.toString());
  }

  removeRow() {
    if (this.queueRows.length > 0) {
      this.queueRows.splice(0, 1);
    }
  }

  deliver() {
    // TODO mark the first order as ready and then remove it
    this.showNotification();
    this.removeRow();
  }

}
