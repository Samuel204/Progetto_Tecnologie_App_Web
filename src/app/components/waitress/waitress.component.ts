import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-waitress',
  templateUrl: './waitress.component.html',
  styleUrls: ['./waitress.component.css']
})
export class WaitressComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

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
