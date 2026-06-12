import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../interfaces/room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private jsonUrl = '/assets/data/Rooms.json';
  private readonly httpClient = inject(HttpClient);

  getRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.jsonUrl);
  }
}
