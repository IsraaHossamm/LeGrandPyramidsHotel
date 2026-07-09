import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  openWhatsapp(): void {
    const phoneNumber = '+201007467117';
    const message = 'Hello, I came throw your website and i need to make a reservation';

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      window.open(url, '_blank');
    }
  }
}
