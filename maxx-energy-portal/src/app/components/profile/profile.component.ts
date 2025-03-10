import { ApiService } from './../../services/api.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, inject } from '@angular/core';
import { IUser } from '../../models/IUser';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
1
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  protected AuthenticationService: AuthenticationService = inject(AuthenticationService);
  private ApiService: ApiService = inject(ApiService);

  isEditEnabled: boolean = false;
  passwordChanged: string = '●●●●●●●●';
  protected emailChangeError: string = '';
  protected errorMessage: string = '';

  InputForm = new FormGroup({
    name: new FormControl(this.AuthenticationService.getUserDetails()?.name),
    email: new FormControl(this.AuthenticationService.getUserDetails()?.email, { validators: Validators.email }),
    password: new FormControl(this.AuthenticationService.getUserDetails()?.password)
  })

  /**
   * Enables or disables edit mode for user profile.
   */
  editMode() {
    this.emailChangeError = '';
    this.errorMessage = '';
    this.isEditEnabled = !this.isEditEnabled;
  }

  /**
   * Cancel changes to user profile.
  */
  cancelEdit() {
    this.isEditEnabled = false;
    this.InputForm.patchValue({name: this.AuthenticationService.getUserDetails()?.name});
    this.InputForm.patchValue({email: this.AuthenticationService.getUserDetails()?.email});
    this.InputForm.patchValue({password: this.AuthenticationService.getUserDetails()?.password});
  }

  /**
   * Submits user profile changes to backend for updating.
   */
  protected async submitProfileForm() {
    const user: IUser = {
      email: this.InputForm.get('email')?.value || '',
      name: this.InputForm.get('name')?.value || '',
      password: this.InputForm.get('password')?.value || ''
    };
    try {
      await this.ApiService.updateProfile(user);
      this.editMode();
      this.passwordChanged = this.InputForm.get('password')?.value || '●●●●●●●●';
    } catch (err: any) {
      if (err.status === 409) {
        this.emailChangeError = 'Email already in use.';
      } else {
        this.errorMessage = 'An unspecified error occurred. Please try again later.';
      }
    }
  }
}
