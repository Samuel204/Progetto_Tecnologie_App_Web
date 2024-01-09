import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
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

  tableIsFree = true;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private authService: AuthenticationService,
  ) {}

  toggleTableStatus() {
    this.tableIsFree = !this.tableIsFree;
  }

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
        console.log(this.tables);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    )
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
