import { Component } from '@angular/core';
import {WaitressComponent} from "../waitress/waitress.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  protected readonly WaitressComponent = WaitressComponent;
}
