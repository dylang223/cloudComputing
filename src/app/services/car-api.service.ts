import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICar } from '../interfaces/car';

@Injectable({
  providedIn: 'root'
})
export class CarApiService {
  private _siteURL = 'http://localhost:5050/api/cars';

  constructor(private _http: HttpClient) {}

  getCars(): Observable<ICar[]> {
    return this._http.get<ICar[]>(this._siteURL)
      .pipe(
        tap(data => console.log('Fetched cars:', data)),
        catchError(this.handleError)
      );
  }

  getCarById(id: string): Observable<ICar> {
    return this._http.get<ICar>(`${this._siteURL}/${id}`)
      .pipe(
        tap(data => console.log('Fetched car:', data)),
        catchError(this.handleError)
      );
  }

  addCar(car: ICar): Observable<ICar> {
    return this._http.post<ICar>(this._siteURL, car)
      .pipe(
        tap(data => console.log('Added car:', data)),
        catchError(this.handleError)
      );
  }

  updateCar(id: string, car: ICar): Observable<ICar> {
    return this._http.put<ICar>(`${this._siteURL}/${id}`, car)
      .pipe(
        tap(data => console.log('Updated car:', data)),
        catchError(this.handleError)
      );
  }

  deleteCar(id: string): Observable<void> {
    return this._http.delete<void>(`${this._siteURL}/${id}`)
      .pipe(
        tap(() => console.log('Deleted car with id:', id)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
