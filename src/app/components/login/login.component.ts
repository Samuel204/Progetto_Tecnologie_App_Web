import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  isLogin: boolean = true;

  errorMessage: string = "";

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    console.log(this.username);
    console.log(this.password);

    let bodyData = {
      username: this.username,
      password: this.password,
    };

    this.http.post("http://localhost:9992/user/login", bodyData).subscribe((resultData: any) => {
      console.log(resultData);

      if (resultData.status) {
        this.router.navigateByUrl('/home');
      } else {
        alert("incorrect username or password");
        console.log("error login");
      }
    });
  }
}

