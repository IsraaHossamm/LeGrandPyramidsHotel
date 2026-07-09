import { Component, inject, OnInit } from '@angular/core';
import { Review } from '../../../core/interfaces/review';
import { ReviewService } from '../../../core/services/reviewsService/review-service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
})
export class Reviews implements OnInit {
  private readonly reviewService = inject(ReviewService);
  reviews: Review[] = [];
  currentIndex = 0;

  ngOnInit(): void {
    this.reviewService.getReviews().subscribe({
      next: (res) => {
        this.reviews = res;
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      },
    });
  }

  // Slice the array for the carousel view
  get displayedReviews() {
    return this.reviews.slice(this.currentIndex, this.currentIndex + 3);
  }

  next(): void {
    const nextIndex = this.currentIndex + 3;

    // If the next chunk has at least one new item to show
    if (nextIndex < this.reviews.length) {
      this.currentIndex = nextIndex;
    } else {
      this.currentIndex = 0; // Loop back to the very start
    }
  }

  prev(): void {
    const prevIndex = this.currentIndex - 3;

    if (prevIndex >= 0) {
      this.currentIndex = prevIndex;
    } else {
      // Loop to the start of the last possible full set of 3
      // Use Math.floor to find the last multiple of 3
      this.currentIndex = Math.max(0, Math.floor((this.reviews.length - 1) / 3) * 3);
    }
  }
}
