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
submitMessage:string=''
  async onSubmit(){
    try {
      const contactObject = {
        name: this.contactForm.getRawValue().name,
        email: this.contactForm.getRawValue().email,
        message: this.contactForm.getRawValue().message
      }
      await this.ApiService.contactCompany(contactObject);
        this.submitMessage='Message sent successfully'
    } catch (error) {
      this.submitMessage='There was an issue with sending your message'
      console.error(error);
    }
  }


}
