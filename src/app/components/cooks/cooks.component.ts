import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from "../../services/authentication.service";
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
  tables: apiData.Table[] = [];
  orders: apiData.FoodOrder[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  // Lifecycle hook - ngOnInit
  ngOnInit(): void {
    this.authService.getUserDataFromToken()!.subscribe(
      data => {
        this.username = (data as any).user.username;
      },
      error => {
        console.error('Error occurred:', error);
      }
    );
    // Fetch all tables once using take(1)
    this.authService.getAllTables().pipe(take(1))
    .subscribe(
      (data) => {
        // Update the tables array with the fetched data
        this.tables = data.map((table=>({_id: table._id, name: table.name, n_seats: table.n_seats, occupied: table.occupied, occupied_seats: table.occupied_seats})));
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    // Periodically fetch updated tables data
    interval(1000)
      .pipe(
        switchMap(() => this.authService.getAllTables())
      )
      .subscribe(
        (data) => {
          // Update individual tables based on fetched data
          data.forEach((item) => {
            let itemToEdit = this.tables.find((table) => item._id == table._id);
            if(itemToEdit){
              let i = this.tables.indexOf(itemToEdit);
              this.tables[i].occupied = item.occupied;
              this.tables[i].occupied_seats = item.occupied_seats;
            };
          });
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );

    interval(1000)
      .pipe(
        switchMap(() => this.authService.getAllKitchenOrders())
      )
      .subscribe(
        (data) => {
          // Update orders array and sort based on date
          this.orders = this.sortOrders((data as any).data.map((order: apiData.FoodOrder) => ({_id: order._id, cod: order.cod, table: order.table, ready: order.ready, delivered: order.delivered, foods: order.foods, date: new Date(order.date),})));
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
  // Method to sort orders based on date
  sortOrders(array: apiData.FoodOrder[]): apiData.FoodOrder[] {
    const compareFunction = (a: apiData.FoodOrder, b: apiData.FoodOrder): number => {
      return a.date.getTime() - b.date.getTime();
    };
    const sortedArray = array.slice().sort(compareFunction);
    return sortedArray;
  }

  // Method to check if an order for a specific table is ready
  isOrderReady(table_id: string): boolean{
    for(let order of this.orders){
      if(order.table._id == table_id){
        return order.ready;
      }
    }
    return false;
  }

  // Method to get foods for a specific order and table
  getSpecificFoodOrder(table_id: string){
    for(let order of this.orders){
      if(order.table._id == table_id){
        return order.foods;
      }
    }
    return null;
  }

  // Method to deliver an order for a specific table
  deliverOrder(table_id: string){
    // deliver the order
    for(let order of this.orders){
      if(order.table._id == table_id){
        this.authService.setKitchenOrderReady(order._id);
        this.showNotification();
      }
    }
    this.closeDetailModal("table-"+table_id);
  }

  // Method to get the count of pending orders
  getPendingOrders(){
    var result = this.orders.length;
    for(let order of this.orders){
      if(order.ready){
        result -= 1;
      }
    }
    return result;
  }

  // Method to show a notification with a timeout
  showNotification() {
    this.isNotificationVisible = true;

    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 2000);
  }

  // Method to open a modal with a specific ID
  openDetailModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  // Method to close a modal with a specific ID
  closeDetailModal(id : string) {
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }

}
