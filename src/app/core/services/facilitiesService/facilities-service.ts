import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facilite } from '../../interfaces/facilite';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  private jsonUrl = '/assets/data/facilities.json';
  private readonly httpClient = inject(HttpClient);

  getFacilities(): Observable<Facilite[]> {
    return this.httpClient.get<Facilite[]>(this.jsonUrl);
  }
}
