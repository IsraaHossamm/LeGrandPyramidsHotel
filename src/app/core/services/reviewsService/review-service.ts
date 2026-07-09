import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review } from '../../interfaces/review';

// 1. Directly import your local reviews JSON data
import reviewsData from '../../../../../public/assets/data/reviews.json';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  getReviews(): Observable<Review[]> {
    // 2. Return it instantly as a safe observable stream
    return of(reviewsData as Review[]);
  }
}
