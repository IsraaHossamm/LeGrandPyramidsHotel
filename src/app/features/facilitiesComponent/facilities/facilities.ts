import { Component, inject, OnInit } from '@angular/core';
import { FacilitiesService } from '../../../core/services/facilitiesService/facilities-service';
import { Facilite } from '../../../core/interfaces/facilite';

@Component({
  selector: 'app-facilities',
  imports: [],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class Facilities implements OnInit {
  private readonly facilitiesService = inject(FacilitiesService);
  facilites: Facilite[] = [];

  ngOnInit(): void {
    // Modernized object configuration syntax
    this.facilitiesService.getFacilities().subscribe({
      next: (res) => {
        this.facilites = res;
      },
      error: (err) => {
        console.error('Error fetching facilities:', err); // Fixed log text typo
      },
    });
  }
}
