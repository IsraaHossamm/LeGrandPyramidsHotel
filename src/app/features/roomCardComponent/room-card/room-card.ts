import { Component, Input, Output, EventEmitter, PLATFORM_ID, inject } from '@angular/core';
import { Room } from '../../../core/interfaces/room';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-room-card',
  imports: [],
  templateUrl: './room-card.html',
  styleUrl: './room-card.css',
})
export class RoomCard {
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  @Input({ required: true }) room!: Room; // Receives data from parent
  @Input() isActive: boolean = false;
  @Output() viewDetails = new EventEmitter<Room>(); // Sends signal to parent

  onViewDetails() {
    this.viewDetails.emit(this.room);
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
