import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { EmailService } from '../../../core/services/emailService/email-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private readonly emailService = inject(EmailService);
  isloading: boolean = false;
  contactForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
    ]),
    message: new FormControl(null, Validators.required),
  });

  prepareApiData(name: any, email: any, phone: any, msg: any): FormData {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', msg);

    // -- Email customization API meta keys
    formData.append('access_key', environment.web3formsKey);
    formData.append('subject', `Request From ${this.contactForm.value.name} `);
    formData.append('from_name', 'New Request from LE GRAND Website');
    return formData;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isloading = true;
    const formData: FormData = this.prepareApiData(
      this.contactForm.value.name,
      this.contactForm.value.email,
      this.contactForm.value.phone,
      this.contactForm.value.message,
    );

    // -- Send email using your custom HttpClient service
    this.emailService.sendEmail(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.isloading = false;
          this.contactForm.reset();
          Swal.fire({
            toast: true, // Enforces the micro-toast visual layout
            position: 'top-end',
            icon: 'success',
            title: 'Success!',
            text: 'Message sent successfully.',
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: 'rounded-xl border border-slate-100 bg-white shadow-xl dark:bg-zinc-900',
              title: 'text-sm font-semibold text-slate-800 dark:text-zinc-100',
            },
          });
        }
      },

      error: (err) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Check your connection and try again!',
          showConfirmButton: false,
          timer: 2500, // Slightly longer so users have time to read the error message
          timerProgressBar: true, // Adds a subtle visual countdown bar at the bottom
          customClass: {
            popup:
              'rounded-xl border border-red-100 bg-white shadow-xl dark:bg-zinc-900 dark:border-red-950/50',
            title: 'text-sm font-semibold text-red-600 dark:text-red-400',
            htmlContainer: 'text-xs text-slate-500 dark:text-slate-400 font-normal',
          },
        });

        this.contactForm.reset();
      },
    });
  }
}
