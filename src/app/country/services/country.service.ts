import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { CountryResponse } from '../interfaces/country-response.interface';
import { CountryMapper } from '../mappers/country.mappers';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  private httpClient = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacherByRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.httpClient.get<CountryResponse[]>(`${environment.CountryApi}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapResponseArrayToCountryArray(resp)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError((error) => {
          return throwError(() => new Error('No se encontró un país con esa capital'));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.httpClient.get<CountryResponse[]>(`${environment.CountryApi}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.mapResponseArrayToCountryArray(resp)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion(region: Region): Observable<Country[]> {

    if (this.queryCacheCountry.has(region)) {
      return of(this.queryCacherByRegion.get(region) ?? []);
    }

    return this.httpClient.get<CountryResponse[]>(`${environment.CountryApi}/region/${region}`)
      .pipe(
        map((resp) => CountryMapper.mapResponseArrayToCountryArray(resp)),
        tap(countries => this.queryCacherByRegion.set(region, countries)),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error('Error al cargar los países'));
        })
      );
  }
}


