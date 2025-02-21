import { ApiService } from './../../services/api.service';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, RouterLinkActive, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
AuthenticationService = inject(AuthenticationService);
ApiService = inject(ApiService);

constructor() {}

}
