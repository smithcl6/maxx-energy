import { AuthenticationService } from './../../services/authentication.service';
import { IUser } from '../../models/IUser';
import { ApiService } from './../../services/api.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * User Login Page.
 */
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private ApiService: ApiService = inject(ApiService);
  private readonly router: Router = inject(Router);
  protected AuthenticationService: AuthenticationService = inject(AuthenticationService);
  protected userForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl<string>('', {nonNullable: true, validators: Validators.email}),
    password: new FormControl<string>('', {nonNullable: true})
  });
  protected loginError: string = '';

  /**
   * Send login form data to API service.
   */
  protected async submitLogin() {
    try {
      const user: IUser = {
        email: this.userForm.getRawValue().email,
        name: '',
        password: this.userForm.getRawValue().password
      }
      await this.ApiService.login(user);
      this.userForm.reset();
      this.loginError = '';
      // this.router.navigate(['/home']);

    } catch (error) {
      this.loginError = 'Invalid email/password';
    }
  }
}

/**
 * Defines what will be required in the Login Form.
 */
interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
