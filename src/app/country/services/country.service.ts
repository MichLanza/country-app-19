import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { CountryResponse } from '../interfaces/country-response.interface';
import { CountryMapper } from '../mappers/country.mappers';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
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

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    return this.httpClient.get<CountryResponse[]>(`${environment.CountryApi}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapResponseArrayToCountryArray(resp)),
        catchError((error) => {
          return throwError(() => new Error('No se encontró el país'));
        })
      );

  }
  searchCountryByCode(code: string) {
    return this.httpClient.get<CountryResponse[]>(`${environment.CountryApi}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.mapResponseArrayToCountryArray(resp)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          return throwError(() => new Error('No se encontró el país'));
        })
      );
  }
}


