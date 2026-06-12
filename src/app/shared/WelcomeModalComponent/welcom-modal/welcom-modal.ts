import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-welcome-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './welcom-modal.html',
  styleUrl: './welcom-modal.css',
})
export class WelcomModal implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  isOpen = false;
  dontShowAgain = false; // Tracks the checkbox state

  ngOnInit() {
    // Check if they previously requested to hide it permanentely
    if (isPlatformBrowser(this.platformId)) {
      const skipModal = localStorage.getItem('skipWelcomeModal');
      if (!skipModal) {
        this.isOpen = true;
      }
    }
  }

  closeModal() {
    this.isOpen = false;

    // Only save to localStorage if they checked the box
    if (this.dontShowAgain && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('skipWelcomeModal', 'true');
    }
  }
}
