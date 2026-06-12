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
    this.facilitiesService.getFacilities().subscribe(
      (res) => {
        this.facilites = res;
        console.log('facilites res done');
      },
      (err) => {
        console.log('error in fac res');
      },
    );
  }
}
