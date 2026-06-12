import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailResponse } from '../../interfaces/email-response';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly httpClient = inject(HttpClient);
  sendEmail(formData: FormData): Observable<EmailResponse> {
    return this.httpClient.post<EmailResponse>('https://api.web3forms.com/submit', formData);
  }
}
