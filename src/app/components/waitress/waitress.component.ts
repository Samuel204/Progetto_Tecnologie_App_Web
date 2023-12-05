import { Component, Renderer2, ElementRef } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-waitress',
  templateUrl: './waitress.component.html',
  styleUrls: ['./waitress.component.css']
})
export class WaitressComponent {

  username: string = "Name Lastname";

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
          // Handle errors, such as network issues or server errors
          console.error('Error occurred:', error);
        }
      );
    } else {
      console.error('Something went wrong when fetching the data!');
    }
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
