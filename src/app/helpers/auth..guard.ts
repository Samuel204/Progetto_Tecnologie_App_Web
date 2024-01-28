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
  // Constructor with injected dependencies
  constructor(private authService: AuthenticationService, private router: Router) {}

  // canActivate method to determine if a route can be activated
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // Get the expected role from route data
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
    
    try{
      // Fetch user data from token
      const data = await this.authService.getUserDataFromToken()!.pipe(first()).toPromise();

      this.roles = [];
      // Extract roles from user data
      for (const i of (data as any).user.roles) {
        this.roles.push(i.role);
      }

      // Check if the user has the expected role
      if(this.roles.includes(expectedRole)){
        return true;
      }
      // Redirect to the homepage if unauthorized user role
      else this.router.navigate(['/']);
      return false;
    }
    catch(error){
      console.error("An error occurred:", error);
      return false;
    }
    
  }

}

