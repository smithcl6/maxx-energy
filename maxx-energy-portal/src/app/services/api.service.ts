import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { lastValueFrom } from 'rxjs';
import { IAuthDetails } from '../models/IAuthDetails';
import { Router } from '@angular/router';

/**
 * Responsible for making all backend API calls.
 * Utilizes the AuthenticationService for any backend routes that require authentication.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http: HttpClient = inject(HttpClient);
  private readonly router: Router = inject(Router);
  private AuthenticationService: AuthenticationService = inject(AuthenticationService);
  private apiEndpoint: string = 'http://localhost:3000/api/';  // TODO: Use environmental variable
  private authApiEndpoint: string = this.apiEndpoint + 'auth/';
  private httpOptions: any = {
    withCredentials: true
  }

  /**
   * Sends user details to backend and logs user in if valid user.
   * Will result in the authentication service setting the app to a logged in state.
   * @param user User details entered upon login.
   */
  async login(user: IUser): Promise<void> {
    const url: string = this.apiEndpoint + 'login';
    const response: any = await lastValueFrom(this.http.post<IAuthDetails>(url, { user }, this.httpOptions));
    this.AuthenticationService.setAuthenticationStatus(response);
    this.router.navigate(['/profile']);
  }

  /**
   * Contacts backend to clear the cookie from the client's browser.
   * Will result in the authentication service setting the app to a logged out state.
   */
  async logout(): Promise<void> {
    const url: string = this.apiEndpoint + 'logout';
    await lastValueFrom(this.http.get<Response>(url, this.httpOptions));
    this.AuthenticationService.setAuthenticationStatus(undefined);
  }

  /**
   * Contacts backend to register a new user and logs them in.
   * @param user New User details created upon registration.
   */
  async registerUser(user: IUser): Promise<void> {
    const url: string = this.apiEndpoint + 'register-user';
    const response: any = await lastValueFrom(this.http.post<IAuthDetails>(url, { user }, this.httpOptions));
    this.AuthenticationService.setAuthenticationStatus(response);
    this.router.navigate(['/profile']);
  }

  /**
   * Placeholder method for sending message to company email.
   * @param contactForm Name, email, and message/question.
   */
  async contactCompany(contactForm: any): Promise<void> {
    const url: string = this.apiEndpoint + 'contact-company';
    const response: any = await lastValueFrom(this.http.post<Response>(url, { contactForm }, this.httpOptions));
  }

  /**
   * Placeholder method for reset password functionality.
   * @param email The email of the user that needs their password reset.
   */
  async resetPassword(email: string): Promise<void> {
    const url: string = this.apiEndpoint + 'reset-password';
    const response: any = await lastValueFrom(this.http.post<Response>(url, email, this.httpOptions));
    console.log(response);
  }

  /**
   * Automatically logs the user in if they still have a cookie storing a valid jwt.
   * Only call this when initially loading the frontend.
   */
  async autoLogin(): Promise<void> {
    if (this.AuthenticationService.authCookieExists()) {
      const url: string = this.authApiEndpoint + 'auto-login';
      const response: any = await lastValueFrom(this.http.get<IAuthDetails>(url, this.httpOptions));
      this.AuthenticationService.setAuthenticationStatus(response);
    }
  }

  /**
   * Contacts backend to update user profile with newer profile information.
   * @param user New user details that are replacing older user details.
   */
  async updateProfile(user: IUser): Promise<void> {
    if (this.AuthenticationService.authCookieExists()) {
      const url: string = this.authApiEndpoint + 'update-profile';
      const response: any = await lastValueFrom(this.http.post<IAuthDetails>(url, { user }, this.httpOptions));
      this.AuthenticationService.setAuthenticationStatus(response);
    }
  }
}
