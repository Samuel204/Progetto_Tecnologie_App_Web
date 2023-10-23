import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username : String ="";
  password : String ="";
  role : String ="";

  constructor(private http:HttpClient) {
  }


  register()
  {
    let bodyData=
      {
        "username": this.username,
        "password":this.password,
        "role":this.role,
      };

    this.http.post("http://localhost:9992/user/create", bodyData, {responseType: 'text'}).subscribe((resultData: any) => {
      console.log(resultData);
      alert("User registered successfully")
    });

  }

  save()
  {
    this.register();
  }

}




