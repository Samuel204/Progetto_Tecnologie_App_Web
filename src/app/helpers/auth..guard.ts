import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot, UrlTree,
} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {AuthenticationClient} from "../client/authentication.client"
import {catchError, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(
    private authService: AuthenticationService,
    private authClient: AuthenticationClient,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data['roles'] ;  // Ottieni i ruoli attesi dalla data della route

      /*return this.authClient.getUserRole().pipe(
          map(userRole => {
              if (!userRole || userRole !== expectedRole) {
                  // Se l'utente non ha un ruolo o il ruolo non corrisponde, reindirizza alla pagina di login o a una pagina di accesso negato
                  this.router.navigate(['/login']);
                  return false;
              }
              return true;
          })
      );*/

      if (!this.authService.isLoggedIn()) {
          this.router.navigate(['/']);
          return false;
      }
      this.authService.isLoggedIn();
      return true;

  }






    /*if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    this.authService.isLoggedIn();
    return true;
  }*/
  /*  let url: string = state.url;
    return this.checkUserLogin(route, url);

  }
    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
      if (this.authService.isLoggedIn()) {
        const userRole = this.authService.getRole();
        if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
          this.router.navigate(['/home']);
          return false;
        }
        return true;
      }

      this.router.navigate(['/home']);
      return false;
    }*/
}

