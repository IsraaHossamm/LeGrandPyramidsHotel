import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facilite } from '../../interfaces/facilite';

// 1. Import the raw JSON data directly into the file bundle
import facilitiesData from '../../../../../public/assets/data/facilities.json';

@Injectable({
  providedIn: 'root',
})
export class FacilitiesService {
  getFacilities(): Observable<Facilite[]> {
    // 2. Wrap the data in 'of()' to cleanly return it as an Observable stream
    return of(facilitiesData as Facilite[]);
  }
}
