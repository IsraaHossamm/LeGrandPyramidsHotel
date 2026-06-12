import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../../core/interfaces/room';

@Component({
  selector: 'app-room-card',
  imports: [],
  templateUrl: './room-card.html',
  styleUrl: './room-card.css',
})
export class RoomCard {
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
    window.open(url, '_blank');
  }
}
