import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { CountryResponse } from '../interfaces/country-response.interface';
import { CountryMapper } from '../mappers/country.mappers';
import { catchError, map, Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private httpClient = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.httpClient.get<CountryResponse[]>(`${environment.CountryApi}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapResponseArrayToCountryArray(resp)),
        catchError((error) => {
          return throwError(() => new Error('No se encontró un país con esa capital'));
        })
      );
  }
}


