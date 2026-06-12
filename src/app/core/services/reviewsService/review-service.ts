import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../../interfaces/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private jsonUrl = '/assets/data/reviews.json';
  private readonly httpClient = inject(HttpClient);

  getReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.jsonUrl);
  }
}
