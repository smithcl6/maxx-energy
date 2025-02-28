import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
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
  enableEdit() {
    this.isEditEnabled = !this.isEditEnabled;
  }
}
