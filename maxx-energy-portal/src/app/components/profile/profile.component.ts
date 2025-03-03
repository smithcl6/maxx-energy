import { ApiService } from './../../services/api.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IUser } from '../../models/IUser';
1
@Component({
  selector: 'app-profile',
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected AuthenticationService: AuthenticationService = inject(AuthenticationService);

  constructor(public router: Router) { }

  isEditEnabled: boolean = false;
/**
 * Enables or disables edit mode for user profile.
 */
  editMode() {
    this.isEditEnabled = !this.isEditEnabled;
    console.log('Edit mode status changed to ' + this.isEditEnabled);
  }

/**
 * Submits changes to user profile to backend for updating.
 */
  submitChanges() {
    //TODO: add logic to submit changes to backend
    console.log('Changes submitted');
    this.editMode();
  }

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
