import {Component, Renderer2, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-waitress',
  templateUrl: './waitress.component.html',
  styleUrls: ['./waitress.component.css']
})
export class WaitressComponent implements OnInit {

  username: string = "";
  foods: { id: number, name: string; price: number }[] = [];
  drinks: { id: number, name: string; price: number }[] = [];

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
    this.authService.getAllFoods().subscribe(
      data => {
        this.foods = data.map(food => ({ id: food._id, name: food.name, price: food.price }));
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
    this.authService.getAllDrinks().subscribe(
      data => {
        this.drinks = data.map(drink => ({ id: drink._id, name: drink.name, price: drink.price }));
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  openDetailModal(){
    const modalElement = this.el.nativeElement.querySelector('#detailModal');
    this.renderer.removeClass(modalElement, 'hidden');
  }

  closeDetailModal() {
    const modalElement = this.el.nativeElement.querySelector('#detailModal');
    this.renderer.addClass(modalElement, 'hidden');
  }

  openDrinkModal(){
    const modalElement = this.el.nativeElement.querySelector('#drinkModal');
    this.renderer.removeClass(modalElement, 'hidden');
  }

  closeDrinkModal(){
    const modalElement = this.el.nativeElement.querySelector('#drinkModal');
    this.renderer.addClass(modalElement, 'hidden');
  }

  openFoodModal(){
    const modalElement = this.el.nativeElement.querySelector('#foodModal');
    this.renderer.removeClass(modalElement, 'hidden');
  }

  closeFoodModal(){
    const modalElement = this.el.nativeElement.querySelector('#foodModal');
    this.renderer.addClass(modalElement, 'hidden');
  }
}
