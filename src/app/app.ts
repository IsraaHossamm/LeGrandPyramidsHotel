import { Component, signal, PLATFORM_ID, inject, OnInit } from '@angular/core'; // Added OnInit here
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Navbar } from './shared/navbarComponent/navbar/navbar';
import { isPlatformBrowser } from '@angular/common';
import { Home } from './features/homeComponent/home/home';
import { Rooms } from './features/roomsComponent/rooms/rooms';
import { Facilities } from './features/facilitiesComponent/facilities/facilities';
import { Reviews } from './features/reviewsComponentl/reviews/reviews';
import { Contact } from './features/contactComponent/contact/contact';
import { WelcomModal } from './shared/WelcomeModalComponent/welcom-modal/welcom-modal';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  // Pro tip: You can safely delete RouterOutlet from this list to clear that yellow terminal warning!
  imports: [RouterOutlet, Navbar, Home, Rooms, Facilities, Reviews, Contact, WelcomModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // Added "implements OnInit"
  protected readonly title = signal('LeGrandHotel');
  private readonly platformId = inject(PLATFORM_ID);

  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  ngOnInit() {
    // FIX: Added 'this.titleService.' right before setTitle
    this.titleService.setTitle('Le Grand Pyramids View Hotel | Luxury Stay in Giza');

    this.metaService.updateTag({
      name: 'description',
      content:
        'Experience breathtaking views of the Great Pyramids from your room. Book your stay at Le Grand Pyramids View Hotel with modern amenities.',
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
