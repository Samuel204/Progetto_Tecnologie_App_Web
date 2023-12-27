import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
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

  roles:string[] = [];
  constructor(private authService: AuthenticationService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const expectedRole = route.data['expectedRole'];

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

    this.authService.getUserDataFromToken()!.pipe(first()).subscribe(
      data => {
        this.roles = [];
        for(let i of (data as any).user.roles){
          this.roles.push(i.role);
        }
      }
    );

    if(this.roles.includes(expectedRole)){
      return true;
    }
    else this.router.navigate(['/']); //sarebbe meglio creare una pagina di non autorizzazione
    return false;
  }

}

