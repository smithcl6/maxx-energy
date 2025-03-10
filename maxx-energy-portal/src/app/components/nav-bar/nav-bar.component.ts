import { ApiService } from './../../services/api.service';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
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
  @ViewChild('navbar') navbar!: ElementRef;
  isCollapsed = false;

  // Track initial navbar position
  navbarPosition: number = 100;

  ngAfterViewInit() {
    this.navbarPosition = this.navbar.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const windowScroll = window.pageYOffset;

    if (windowScroll > this.navbarPosition) {
      this.isCollapsed = true;
    } else { 
      this.isCollapsed = false;
    }
  }
}
