import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Room } from '../../interfaces/room';

// 1. Directly import your local rooms JSON data
import roomsData from '../../../../../public/assets/data/Rooms.json';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  getRooms(): Observable<Room[]> {
    // 2. Return it instantly as a safe observable stream
    return of(roomsData as Room[]);
  }
}
