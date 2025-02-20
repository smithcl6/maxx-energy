import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http: HttpClient = inject(HttpClient);
  private AuthenticationService: AuthenticationService = inject(AuthenticationService);
  private apiEndpoint: string = 'http://localhost:3000/api/';  // TODO: Use environmental variable
  private authApiEndpoint: string = this.apiEndpoint + 'auth/';
  private httpOptions: any = {
    withCredentials: true
  }

  constructor() {
    this.autoLogin();
  }

  async login(user: IUser): Promise<void> {
    const url: string = this.apiEndpoint + 'login';
    const response: any = await lastValueFrom(this.http.post<Response>(url, user, this.httpOptions));
    this.AuthenticationService.userDetails = response;
    this.AuthenticationService.getAuthenticationStatus();
  }

  async logout(): Promise<void> {
    if (this.AuthenticationService.getAuthenticationStatus()) {
      const url: string = this.apiEndpoint + 'logout';
      await lastValueFrom(this.http.get<Response>(url, this.httpOptions));
      this.AuthenticationService.userDetails = undefined;
      this.AuthenticationService.getAuthenticationStatus();
    }
  }

  // Only call this when initially loading the service.
  private async autoLogin(): Promise<void> {
    if (this.AuthenticationService.getAuthenticationStatus()) {
      const url: string = this.authApiEndpoint + 'auto-login';
      const response: any = await lastValueFrom(this.http.get<Response>(url, this.httpOptions));
      this.AuthenticationService.userDetails = response;
      this.AuthenticationService.getAuthenticationStatus();
    }
  }
}
