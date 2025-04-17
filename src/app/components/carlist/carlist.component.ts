import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarApiService } from '../../services/car-api.service';
import { ICar, NewCar } from '../../interfaces/car';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-carlist',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  carsData: ICar[] = [];
  show: boolean = false;

  constructor(private _carAPIService: CarApiService) {}

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this._carAPIService.getCars().subscribe({
      next: (data) => {
        this.carsData = data;
        this.show = true;
      },
      error: (err) => {
        console.error('Error fetching cars:', err);
        this.show = false;
      }
    });
  }

  addCar(make: string, model: string, year: string, imageURL: string): boolean {
    let addCar: ICar = new NewCar(make, model, year, imageURL);
    this._carAPIService.addCar(addCar).subscribe({
      next: () => {
        this.getCars(); // Refresh the list after adding
      },
      error: (err) => {
        console.error('Error adding car:', err);
      }
    });
    return false;
  }

  deleteCar(id: string): void {
    this._carAPIService.deleteCar(id).subscribe({
      next: () => {
        this.getCars();
      },
      error: (err) => {
        console.error('Error deleting car:', err);
      }
    });
  }
}