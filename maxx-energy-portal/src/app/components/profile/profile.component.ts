import { IUser } from '../../models/IUser';
import { ApiService } from '../../services/api.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected AuthenticationService: AuthenticationService = inject(AuthenticationService);
  private ApiService: ApiService = inject(ApiService);

  // Using this for testing API service and backend
  protected submitProfileForm() {
    const user: IUser = {
      email: 'updated@email.com',
      name: 'Updated Name'
    };
    this.ApiService.updateProfile(user);
  }
}
