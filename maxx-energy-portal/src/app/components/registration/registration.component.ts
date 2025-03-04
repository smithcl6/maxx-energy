import { IUser } from '../../models/IUser';
import { ApiService } from './../../services/api.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-registration',
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  private ApiService: ApiService = inject(ApiService);

  // TODO: Implement functionality using an actual form
  protected submitRegistration() {
    const user: IUser = {
      email: 'newUser@email.com',
      name: 'New User',
      password: 'new password'
    };
    this.ApiService.registerUser(user);
  }

  // Using this for testing API service and backend
  protected submitContactForm() {
    const body: any = {
      name: 'Bob',
      email: 'hi@email.com',
      message: 'This is a hardcoded message contacting admins.'
    };
    this.ApiService.contactCompany(body);
  }

  // Using this for testing API service and backend.
  protected submitPasswordReset() {
    this.ApiService.resetPassword('hi@email.com');
  }
}
