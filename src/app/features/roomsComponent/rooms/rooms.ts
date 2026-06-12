import { Component, inject, OnInit } from '@angular/core';
import { RoomCard } from '../../roomCardComponent/room-card/room-card';
import { RoomDetails } from '../../roomDetailsComponent/room-details/room-details';
import { RoomService } from '../../../core/services/roomservice/roomService';
import { Room } from '../../../core/interfaces/room';

@Component({
  selector: 'app-rooms',
  imports: [RoomCard, RoomDetails],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms implements OnInit {
  private readonly roomService = inject(RoomService);
  rooms: Room[] = [];
  selectedRoom?: Room;

  // Track the active index for the divided indicator
  currentRoomIndex: number = 0;

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((res) => {
      this.rooms = res;
      this.selectedRoom = res[4];
    });
  }

  setSelectedRoom(room: Room) {
    this.selectedRoom = room;
  }

  // Detect which slide is currently centered on the screen
  onMobileScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollLeft = element.scrollLeft;
    const clientWidth = element.clientWidth;

    if (clientWidth > 0) {
      // Math.round ensures the step flips exactly when crossing the halfway midpoint
      this.currentRoomIndex = Math.round(scrollLeft / clientWidth);
    }
  }
}
