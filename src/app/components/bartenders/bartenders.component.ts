import { Component, Renderer2, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-bartenders',
  templateUrl: './bartenders.component.html',
  styleUrls: ['./bartenders.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out'))
    ])
  ]
})
export class BartendersComponent {

  isNotificationVisible: boolean = false;

  showNotification() {
    this.isNotificationVisible = true;

    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 2000);
  }
  
  constructor(private renderer: Renderer2, private el: ElementRef) {}

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
