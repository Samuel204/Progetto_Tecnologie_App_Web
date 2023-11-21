import { Component } from '@angular/core';
import {WaitressComponent} from "../waitress/waitress.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Access the data passed from the previous component
    if(this.route.snapshot.paramMap.get('registered') === 'true'){
      this.showNotification();
      console.log("Wahoooo");
    }
    
  }

  isNotificationVisible: boolean = false;

  showNotification() {
    this.isNotificationVisible = true;

    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 5000);
  }

  protected readonly WaitressComponent = WaitressComponent;
}
