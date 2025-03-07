import { Component, inject } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  private ApiService: ApiService = inject(ApiService);
  contactForm = new FormGroup({
    name: new FormControl(''),
    email:new FormControl(''),
    message:new FormControl('')
  });
//api call
  async onSubmit(){
    console.log(this.contactForm.value)
    try {
      const contactObject = {
        name: this.contactForm.getRawValue().name,
        email: this.contactForm.getRawValue().email,
        message: this.contactForm.getRawValue().message
      }
      await this.ApiService.contactCompany(contactObject);
    } catch (error) {
      console.error(error);
      // Show some sort of error message take place
      //need to make it so it doesnt show every time
      //show that the message is sent

      if (error === false)
        alert('your message was sent successfully');
      else
        alert('Something went wrong while submitting your message. Please try again.');
    }
  }


}
