import { ApiService } from './../../services/api.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IUser } from '../../models/IUser';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
1
@Component({
  selector: 'app-profile',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected AuthenticationService: AuthenticationService = inject(AuthenticationService);

  private ApiService: ApiService = inject(ApiService);

  constructor(public router: Router) { }

  isEditEnabled: boolean = false;

  InputForm = new FormGroup({
    name: new FormControl(this.AuthenticationService.getUserDetails()?.name),
    email: new FormControl(this.AuthenticationService.getUserDetails()?.email, { validators: Validators.email }),
    password: new FormControl(this.AuthenticationService.getUserDetails()?.password)
  })

  /**
   * Enables or disables edit mode for user profile.
   */
  editMode() {
    this.isEditEnabled = !this.isEditEnabled;
    console.log('Edit mode status changed to ' + this.isEditEnabled);
  }

  // Using this for testing API service and backend
  /**
   * Submits user profile changes to backend for updating.
   */
  protected submitProfileForm() {
    const user: IUser = {
      email: this.InputForm.get('email')?.value || '',
      name: this.InputForm.get('name')?.value || '',
      password: this.InputForm.get('password')?.value || ''
    };
    this.ApiService.updateProfile(user);
    console.log('Changes submitted. Name: ' + this.AuthenticationService.getUserDetails()?.name + ', Email: ' + this.AuthenticationService.getUserDetails()?.email);
    this.editMode();
  }

// For Debug
  DisplayName(){
    console.log(this.AuthenticationService.getUserDetails()?.name + ", " + this.AuthenticationService.getUserDetails()?.email);
  }
}
