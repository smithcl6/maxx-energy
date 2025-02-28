import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

/**
 * Prevents access from routes that require the user to be logged in.
 * @param route Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
 * @param state Represents the state of the router at a moment in time.
 * @returns Boolean authentication status of user tracked by the Authentication Service.
 */
export const loginRequired: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const authStatus: boolean = authenticationService.getAuthenticationStatus();
  return authStatus;
};

/**
 * Prevents access from routes that require the user to be logged out.
 * @param route Contains the information about a route associated with a component loaded in an outlet at a particular moment in time.
 * @param state Represents the state of the router at a moment in time.
 * @returns Boolean authentication status (inversed) of user tracked by the Authentication Service.
 */
export const logoutRequired: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const authStatus: boolean = authenticationService.getAuthenticationStatus();
  return !authStatus;
};
