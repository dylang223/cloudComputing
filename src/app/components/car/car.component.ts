import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApiService } from '../../services/car-api.service';
import { ICar } from '../../interfaces/car';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card mb-3">
      <img [src]="carData.imageURL" class="card-img-top" [style.width.px]="carImageWidth" alt="{{carData.make}} {{carData.model}}">
      <div class="card-body">
        <h5 class="card-title">{{carData.make}} {{carData.model}}</h5>
        <p class="card-text">Year: {{carData.year}}</p>
      </div>
    </div>
  `
})
export class CarComponent {
  // With this – we receive in car information to this component so we can display!
  @Input() carData!: ICar;

  carImageWidth: number = 300; // This keeps our car image size pretty neat…

  constructor(private _carAPIService: CarApiService) {}

}
