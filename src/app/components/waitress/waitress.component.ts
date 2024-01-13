import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {  }

  ngOnInit(): void {
    this.authService.getUserDataFromToken()!.subscribe(
      data => {
        this.username = (data as any).user.username;
      },
      error => {
        console.error('Error occurred:', error);
      }
    );
    this.authService.getAllFoods().subscribe(
      data => {
        this.foods = data.map(food => ({ _id: food._id, name: food.name, price: food.price }));
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.authService.getAllDrinks().subscribe(
      data => {
        this.drinks = data.map(drink => ({ _id: drink._id, name: drink.name, price: drink.price }));
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.authService.getAllTables().subscribe(
      data => {
        this.tables = data.map((table=>({_id: table._id, name: table.name, n_seats: table.n_seats, occupied: table.occupied})));
        this.generateForms()
      },
      error => {
        console.error('Error fetching data:', error);
      }
    )
    this.authService.getAllKitchenOrders().subscribe(
      data => {
        this.foodOrders = (data as any).data.map(((order: apiData.FoodOrder)=>({_id: order._id, cod: order.cod, table: order.table, ready: order.ready, foods: order.foods, date: order.date})));
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.authService.getAllBarOrders().subscribe(
      data => {
        this.drinkOrders = (data as any).data.map(((order: apiData.DrinkOrder)=>({_id: order._id, cod: order.cod, table: order.table, ready: order.ready, drinks: order.drinks, date: order.date})));
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  generateForms(){
    this.tables.forEach((table) => {
      const form = this.fb.group({});
      form.addControl('tableId', this.fb.control(`${table._id}`, Validators.required));
      this.foods.forEach((item) => {
        form.addControl(item._id, this.fb.control(0, Validators.min(0)));
      });
      this.foodForms.push(form);
    });
  }

  getSpecificFoodOrder(table_id: string){
    for(let order of this.foodOrders){
      if(order.table._id == table_id){
        return order.foods;
      }
    }
    return null;
  }

  getSpecificDrinkOrder(table_id: string){
    for(let order of this.drinkOrders){
      if(order.table._id == table_id){
        return order.drinks;
      }
    }
    return null;
  }

  submitFoodForm(formData: any, modalId: string) {
    const tableId = formData.tableId;
    const orderDetails = Object.entries(formData)
      .filter(([name]) => name !== 'tableId')
      .map(([name, value]) => ({ id: name, quantity: value }));
    
    let items : apiData.FoodItem[] = [];
    for(let f of orderDetails){
      console.log(f.id);
      console.log(this.foods);
      const matchingFoodItem = this.foods.find((item) => item._id === f.id);
      console.log(f.quantity);
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

    if(items.length > 0){
      this.authService.createKitchenOrder(this.generateRandomString(12), tableId, items, new Date());
    }

    this.closeDetailModal(modalId);
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  openDetailModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  closeDetailModal(id : string) {
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }

  openDrinkModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  closeDrinkModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }

  openFoodModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.removeClass(modalElement, 'hidden');
  }

  closeFoodModal(id: string){
    const modalElement = this.el.nativeElement.querySelector('#'+id);
    this.renderer.addClass(modalElement, 'hidden');
  }
}
