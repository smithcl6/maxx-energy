import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // TODO: Set all properties to private once cookie observable exists
  isAuthenticated: boolean = false;
  userDetails: IUser | undefined;

  constructor() {
    // TODO: Set isAuthenticated to true if auth-token cookie exists
    // TODO: Set name and email in userDetails if cookie exists
  }

  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }

  getUserDetails() {
    return this.userDetails;
  }
}
