import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from "../../services/authentication.service";
import * as apiData from "../../api_interfaces";

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})
export class CashierComponent implements OnInit {

  isNotificationVisible: boolean = false;
  username: string = "";
  foods: apiData.Food[] = [];
  drinks: apiData.Drink[] = [];
  tables: apiData.Table[] = [];
  foodOrders: apiData.FoodOrder[] = [];
  drinkOrders: apiData.DrinkOrder[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  // Lifecycle hook - ngOnInit
  ngOnInit(): void {
    this.authService.getUserDataFromToken()!.subscribe(
      data => {
        this.username = (data as any).username;
      },
      error => {
        console.error('Error occurred:', error);
      }
    );
    // Fetch all foods and map the response to a simplified format
    this.authService.getAllFoods()
    .pipe(
        map(data => data.map(food => ({ _id: food._id, name: food.name, price: food.price }))),
        catchError(error => {
            console.error('Error fetching data:', error);
            return [];
        })
    )
    .subscribe(mappedData => {
        this.foods = mappedData;
    });

    // Fetch all drinks and map the response to a simplified format
    this.authService.getAllDrinks()
    .pipe(
      map(data => data.map(drink => ({ _id: drink._id, name: drink.name, price: drink.price }))),
      catchError(error => {
          console.error('Error fetching data:', error);
          return [];
      })
    )
    .subscribe(mappedData => {
        this.drinks = mappedData;
    });

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
    // Periodically fetch updated kitchen orders data
    interval(1000)
      .pipe(
        switchMap(() => this.authService.getAllKitchenOrders())
      )
      .subscribe(
        (data) => {
          this.foodOrders = (data as any).data.map((order: apiData.FoodOrder) => ({_id: order._id, cod: order.cod, table: order.table, ready: order.ready, delivered: order.delivered, foods: order.foods, date: order.date,}));
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    // Periodically fetch updated bar orders data
      interval(1000)
      .pipe(
        switchMap(() => this.authService.getAllBarOrders())
      )
      .subscribe(
        (data) => {
          this.drinkOrders = (data as any).data.map((order: apiData.DrinkOrder)=>({_id: order._id, cod: order.cod, table: order.table, ready: order.ready, delivered: order.delivered, drinks: order.drinks, date: order.date}));
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  // Method to check if a food order is ready based on table ID
  isFoodOrderReady(table_id: string): boolean{
    for(let order of this.foodOrders){
      if(order.table._id == table_id){
        return order.ready;
      }
    }
    return false;
  }

  // Method to check if a drink order is ready based on table ID
  isDrinkOrderReady(table_id: string): boolean{
    for(let order of this.drinkOrders){
      if(order.table._id == table_id){
        return order.ready;
      }
    }
    return false;
  }

  // Method to check if a food order is delivered based on table ID
  isFoodOrderDelivered(table_id: string): boolean{
    for(let order of this.foodOrders){
      if(order.table._id == table_id){
        return order.delivered;
      }
    }
    return false;
  }

  // Method to check if a drink order is delivered based on table ID
  isDrinkOrderDelivered(table_id: string): boolean{
    for(let order of this.drinkOrders){
      if(order.table._id == table_id){
        return order.delivered;
      }
    }
    return false;
  }

  // Method to get specific food order based on table ID
  getSpecificFoodOrder(table_id: string){
    for(let order of this.foodOrders){
      if(order.table._id == table_id){
        return order.foods;
      }
    }
    return null;
  }

  // Method to get specific drink order based on table ID
  getSpecificDrinkOrder(table_id: string){
    for(let order of this.drinkOrders){
      if(order.table._id == table_id){
        return order.drinks;
      }
    }
    return null;
  }

  // Method to get the food order based on table ID
  getFoodOrder(table_id: string){
    for(let order of this.foodOrders){
      if(order.table._id == table_id){
        return order;
      }
    }
    return null;
  }

  // Method to get the drink order based on table ID
  getDrinkOrder(table_id: string){
    for(let order of this.drinkOrders){
      if(order.table._id == table_id){
        return order;
      }
    }
    return null;
  }

  // Method to check if the order is computable based on table ID
  isOrderComputable(table_id: string){
    if(this.getFoodOrder(table_id) || this.getDrinkOrder(table_id)){
      var foodOrder = this.getFoodOrder(table_id);
      var drinkOrder = this.getDrinkOrder(table_id);
      if(foodOrder && drinkOrder){
        return foodOrder.delivered && drinkOrder.delivered;
      }
      else if(foodOrder){
        return foodOrder.delivered;
      }
      else if(drinkOrder){
        return drinkOrder.delivered;
      }
    }
    return false;
  }

  // Method to compute the total price of the order based on table ID
  computeTotalPrice(table_id: string): number{
    var foodItems = this.getSpecificFoodOrder(table_id);
    var drinkItems = this.getSpecificDrinkOrder(table_id);
    var total = 0;
    if(foodItems){
      for(let item of foodItems){
        let price = this.getFood(item.food).price;
        total += price * item.quantity;
      }
    }
    if(drinkItems){
      for(let item of drinkItems){
        let price = this.getDrink(item.drink).price;
        total += price * item.quantity;
      }
    }
    return total;
  }

  // Method to get the food details based on ID
  getFood(id: string): apiData.Food{
    for(let food of this.foods){
      if(food._id == id){
        return food;
      }
    }
    return {_id: "0", name: "0", price: 0};
  }

  // Method to get the drink details based on ID
  getDrink(id: string): apiData.Drink{
    for(let drink of this.drinks){
      if(drink._id == id){
        return drink;
      }
    }
    return {_id: "0", name: "0", price: 0};
  }

  // Method to close an order and show a notification
  closeOrder(table_id: string, modal_id: string){
    this.authService.clearOrders(table_id);
    this.closeDetailModal(modal_id);
    this.showNotification();
  }

  // Method to get the total number of customers across all tables
  getAllCustomers(){
    var result = 0;
    for(let table of this.tables){
      result += table.occupied_seats;
    }
    return result;
  }

  // Method to get the total number of free tables
  getFreeTables(){
    var result = this.tables.length;
    for(let table of this.tables){
      if(table.occupied){
        result -= 1;
      }
    }
    return result;
  }

  // Method to open a generic detail modal based on the given ID
  openDetailModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  // Method to close a generic detail modal based on the given ID
  closeDetailModal(id : string) {
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }

  // Method to show a notification for a certain duration
  showNotification() {
    this.isNotificationVisible = true;

    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 2000);
  }

}
