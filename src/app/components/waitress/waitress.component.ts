import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from "../../services/authentication.service";
import * as apiData from "../../api_interfaces";

@Component({
  selector: 'app-waitress',
  templateUrl: './waitress.component.html',
  styleUrls: ['./waitress.component.css']
})

export class WaitressComponent implements OnInit {

  username: string = "";
  foods: apiData.Food[] = [];
  drinks: apiData.Drink[] = [];
  tables: apiData.Table[] = [];
  foodOrders: apiData.FoodOrder[] = [];
  drinkOrders: apiData.DrinkOrder[] = [];

  foodForms: FormGroup[] = [];
  drinkForms: FormGroup[] = [];
  seatForms: FormGroup[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {  }

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
        this.generateForms();
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

  // Method to generate forms for food, drinks, and seats
  generateForms(){
    // Food forms creation
    this.tables.forEach((table) => {
      const form = this.fb.group({});
      form.addControl('tableId', this.fb.control(`${table._id}`, Validators.required));
      this.foods.forEach((item) => {
        form.addControl(item._id, this.fb.control(0, Validators.min(0)));
      });
      this.foodForms.push(form);
    });

    //Drink forms creation
    this.tables.forEach((table) => {
      const form = this.fb.group({});
      form.addControl('tableId', this.fb.control(`${table._id}`, Validators.required));
      this.drinks.forEach((item) => {
        form.addControl(item._id, this.fb.control(0, Validators.min(0)));
      });
      this.drinkForms.push(form);
    });

    //Seat forms creation
    this.tables.forEach((table) => {
      const form = this.fb.group({});
      form.addControl('tableId', this.fb.control(`${table._id}`, Validators.required));
      form.addControl('occupiedSeats', this.fb.control(1, [Validators.required, Validators.min(1), Validators.max(table.n_seats)]));
      this.seatForms.push(form);
    });
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

  // Method to submit food order form data
  submitFoodForm(formData: any, modalId: string) {
    // Extract table ID and order details from form data
    const tableId = formData.tableId;
    const orderDetails = Object.entries(formData)
      .filter(([name]) => name !== 'tableId')
      .map(([name, value]) => ({ id: name, quantity: value }));

    // Process and create food items based on order details
    let items : apiData.FoodItem[] = [];
    for(let f of orderDetails){
      const matchingFoodItem = this.foods.find((item) => item._id === f.id);
      if(matchingFoodItem){
        if(Number(f.quantity) > 0){
          let temp_item : apiData.FoodItem = {
            food: f.id,
            name: matchingFoodItem.name,
            quantity: Number(f.quantity),
          };
          items.push(temp_item);
        }
      }
      else{
        console.log("This shouldn't be happening!");
      }
    }
    // If there are valid items, create a kitchen order
    if(items.length > 0){
      this.authService.createKitchenOrder(this.generateRandomString(12), tableId, items, new Date());
    }
    // Close the order details modal
    this.closeDetailModal(modalId);
  }

  // Method to submit drink order form data
  submitDrinkForm(formData: any, modalId: string){
    // Extract table ID and order details from form data
    const tableId = formData.tableId;
    const orderDetails = Object.entries(formData)
      .filter(([name]) => name !== 'tableId')
      .map(([name, value]) => ({ id: name, quantity: value }));

    // Process and create drink items based on order details
    let items : apiData.DrinkItem[] = [];
    for(let f of orderDetails){
      const matchingDrinkItem = this.drinks.find((item) => item._id === f.id);
      if(matchingDrinkItem){
        if(Number(f.quantity) > 0){
          let temp_item : apiData.DrinkItem = {
            drink: f.id,
            name: matchingDrinkItem.name,
            quantity: Number(f.quantity),
          };
          items.push(temp_item);
        }
      }
      else{
        console.log("This shouldn't be happening!");
      }
    }
    // If there are valid items, create a bar order
    if(items.length > 0){
      this.authService.createBarOrder(this.generateRandomString(12), tableId, items, new Date());
    }

    this.closeDetailModal(modalId);
  }

  // Method to get the total number of pending orders
  getAllPendingOrders(){
    let result = 0;
    for(let order of this.foodOrders){
      if(order.ready && (!order.delivered)){
        result += 1;
      }
    }
    for(let order of this.drinkOrders){
      if(order.ready && (!order.delivered)){
        result += 1;
      }
    }
    return result;
  }

  // Method to get the total number of occupied seats in all tables
  getAllCustomers(){
    let result = 0;
    for(let table of this.tables){
      result += table.occupied_seats;
    }
    return result;
  }

  // Method to submit seat form data
  submitSeatForm(formData: any, modalId: string){
    // Extract table ID and occupied seats from form data
    const tableId = formData.tableId;
    const occupiedSeats = formData.occupiedSeats;
    // Set the table as occupied with the specified number of seats
    this.authService.setTableOccupied(tableId, occupiedSeats);
    this.closeSeatModal(modalId);
  }

  // Method to generate a random string of a given length
  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  // Method to deliver a food order based on table ID
  deliverFoodOrder(table_id: string){
    for(let order of this.foodOrders){
      if(order.table._id == table_id){
        this.authService.deliverKitchenOrder(order._id);
      }
    }
    this.closeDetailModal('table-'+table_id);
  }

  // Method to deliver a drink order based on table ID
  deliverDrinkOrder(table_id: string){
    for(let order of this.drinkOrders){
      if(order.table._id == table_id){
        this.authService.deliverBarOrder(order._id);
      }
    }
    this.closeDetailModal('table-'+table_id);
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

  // Method to open the drink modal based on the given ID
  openDrinkModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  // Method to close the drink modal based on the given ID
  closeDrinkModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }

  // Method to open the food modal based on the given ID
  openFoodModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  // Method to close the food modal based on the given ID
  closeFoodModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }

  // Method to open the seat modal based on the given ID
  openSeatModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  // Method to close the seat modal based on the given ID
  closeSeatModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }
}
