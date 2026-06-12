import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { EmailService } from '../../../core/services/emailService/email-service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly emailService = inject(EmailService);

  // Alert & loading states
  isSubmitting = false;
  showAlert = false;
  alertMessage = '';
  color = 'green';

  contactForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
  });

  // Getter for alert dynamic classes (remains unchanged)
  get alertColor(): string {
    return `text-${this.color}-400`;
  }

  hideAlert(): void {
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // -- Set formData values from the Reactive Form
    const formData = new FormData();
    formData.append('name', this.contactForm.value.name);
    formData.append('email', this.contactForm.value.email);
    formData.append('phone', this.contactForm.value.phone);
    formData.append('message', this.contactForm.value.message);

    // -- Email customization API meta keys
    formData.append('access_key', environment.web3formsKey);
    formData.append('subject', `Request From ${this.contactForm.value.name} `);
    formData.append('from_name', 'New Request from LE GRAND Website');

    // -- Send email using your custom HttpClient service
    this.emailService.sendEmail(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.alertMessage = res.body?.message || 'Email sent successfully!';
          this.color = 'green';
          this.contactForm.reset();
        } else {
          // Handles 400 or 429 structured API errors
          this.alertMessage =
            res.body?.message || res.message || 'Something went wrong, try again later!';
          this.color = 'red';
        }
        this.finalizeSubmission();
      },
      error: (err) => {
        // Handles 500 server crashes or network failures
        console.error(err);
        this.alertMessage = 'Something went wrong, try again later!';
        this.color = 'red';
        this.finalizeSubmission();
      },
    });
  }

  private finalizeSubmission(): void {
    this.isSubmitting = false;
    this.showAlert = true;
    this.hideAlert();
  }
}
