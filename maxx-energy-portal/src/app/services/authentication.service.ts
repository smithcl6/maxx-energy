import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private CookieService: CookieService = inject(CookieService);
  // TODO: Set all properties to private once cookie observable exists
  private isAuthenticated: boolean = false;
  userDetails: IUser | undefined;

  // Technically, the service only keeps track of the cookie when calling this method.
  // TODO: Using some sort of event driven method would be better than this. (an observable)
  // It's good that we only allow the isAuthenticated property to be modified in one place.
  // But it is not good practice for this getter to essentially also work as a setter.
  getAuthenticationStatus(): boolean {
    if (this.CookieService.check('auth-token')) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }

  getUserDetails() {
    return this.userDetails;
  }
}
