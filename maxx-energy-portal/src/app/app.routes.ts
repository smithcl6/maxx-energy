import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { LoginComponent } from './components/login/login.component';
import { FAQComponent } from './components/f-a-q/f-a-q.component';
import { DataComponent } from './components/data/data.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { loginRequired, logoutRequired } from './route.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'data', component: DataComponent, canActivate: [loginRequired]},
  {path: 'faq', component: FAQComponent},
  {path: 'login', component: LoginComponent, canActivate: [logoutRequired]},
  {path: 'password-reset', component: PasswordResetComponent, canActivate: [loginRequired]},
  {path: 'profile', component: ProfileComponent, canActivate: [loginRequired]},
  {path: 'registration', component: RegistrationComponent, canActivate: [logoutRequired]}
];
