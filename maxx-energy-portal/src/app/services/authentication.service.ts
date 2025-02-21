import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { IUser } from '../models/IUser';
import { CookieService } from 'ngx-cookie-service';
import { IAuthDetails } from '../models/IAuthDetails';

/**
 * Tracks and emits the authentication state of the user.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly AUTH_TOKEN: string = 'auth-token';
  private CookieService: CookieService = inject(CookieService);
  private timer: any;
  private isAuthenticated: WritableSignal<boolean> = signal(this.CookieService.check(this.AUTH_TOKEN));
  private userDetails: WritableSignal<IUser | undefined> = signal(undefined);

  // Essentially these are getter/accessor methods.
  getAuthenticationStatus: Signal<boolean> = computed(() => this.isAuthenticated());
  getUserDetails: Signal<IUser | undefined> = computed(() => this.userDetails());

  // Updates the app state to be logged out
  private clearAuthentication() {
    this.isAuthenticated.set(false);
    this.userDetails.set(undefined);
  }

  // Updates the app state to be logged in and sets timer to automatically log out.
  // Also called when logging out, which will clear the auto logout timer and immediately clear authentication state.
  setAuthenticationStatus(details?: IAuthDetails): void {
    if (this.CookieService.check(this.AUTH_TOKEN) && details) {
      this.userDetails.set(details.user);
      this.isAuthenticated.set(true);
      clearTimeout(this.timer);  // Ensures only one timeout exists at any time.
      this.timer = setTimeout(this.clearAuthentication.bind(this), details.timer)
    } else {
      clearTimeout(this.timer);
      this.clearAuthentication();
    }
  }
}
