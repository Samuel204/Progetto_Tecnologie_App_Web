import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  Router,
  RouterStateSnapshot, UrlTree,
} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root',
})


export class authGuard implements CanActivate{

  role:string = 'ruolo';
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    console.log('User Role:', this.role);

    // Check if the user is authenticated
    if (!this.authService.isLoggedIn()) {
      console.log('User is not logged in. Redirecting to login page.');
      this.router.navigate(['/login']);
      return false;
    }

    // If it's the homepage, allow access without checking the role
    if (state.url === '/') {
      console.log('Accessing the homepage. Allowing access.');
      return true;
    }

    if (this.authService.getUserDataFromToken()?.subscribe) {
      this.authService.getUserDataFromToken()!.subscribe(
        data => {
          this.role = (data as any).user.roles[0].role;
        }
      );
    }
    if(this.role===expectedRole  ){
      return true;
    }
    else this.router.navigate(['/login']); //sarebbe meglio creare una pagina di non autorizzazione
    return false;
  }

}

