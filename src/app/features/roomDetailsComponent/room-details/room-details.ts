import { Component, Input, OnChanges, PLATFORM_ID, inject } from '@angular/core';
import { RoomCard } from '../../roomCardComponent/room-card/room-card';
import { Room } from '../../../core/interfaces/room';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-room-details',
  imports: [],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails implements OnChanges {
  @Input() room?: Room; // Receives the selected room
  activeImage: string = '';
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  ngOnChanges() {
    if (this.room) {
      // Whenever the room changes, reset the big image to the first image in the array
      this.activeImage = this.room.images[0];
    }
  }
  openWhatsapp(roomTitle: string | undefined): void {
    const phoneNumber = '+201007467117';
    const message = `Hello, I came throw your website and i need to make a reservation for ${roomTitle} `;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      window.open(url, '_blank');
    }
  }
}
