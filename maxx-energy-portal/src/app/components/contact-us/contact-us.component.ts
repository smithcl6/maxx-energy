import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule,],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactForm = new FormGroup({
    name: new FormControl(''),
    email:new FormControl(''),
    message:new FormControl('')
  });
  onSubmit(){
    console.log(this.contactForm.value)  //would assume backend gets linked here somewhere.
  }
}
