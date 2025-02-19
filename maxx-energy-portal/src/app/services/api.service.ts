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

  async login(user: IUser) {
    const url: string = this.apiEndpoint + 'login';
    const response: any = await lastValueFrom(this.http.post<Response>(url, user, this.httpOptions));
    this.AuthenticationService.userDetails = response;
    this.AuthenticationService.isAuthenticated = true;
  }

  async logout() {
    if (this.AuthenticationService.getAuthenticationStatus()) {
      // TODO: Create logout endpoint in backend
      // const url: string = this.authApiEndpoint + 'logout';
      // const response: any = await lastValueFrom(this.http.get<Response>(url, this.httpOptions));
      // console.log(response);
      this.AuthenticationService.userDetails = undefined;
      this.AuthenticationService.isAuthenticated = false;
    }
  }
}
