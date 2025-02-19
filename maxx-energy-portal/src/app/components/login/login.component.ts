import { AuthenticationService } from './../../services/authentication.service';
import { IUser } from '../../models/IUser';
import { ApiService } from './../../services/api.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private ApiService: ApiService = inject(ApiService);
  protected AuthenticationService: AuthenticationService = inject(AuthenticationService);

  login() {
    const user: IUser = {
      email: 'hi@email.com',
      name: 'Chris',
      password: 'abc123'
    }
    this.ApiService.login(user);
  }

  logout() {
    this.ApiService.logout();
  }
}
