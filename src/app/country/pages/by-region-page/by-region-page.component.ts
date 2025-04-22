import { Component, inject, linkedSignal, signal } from '@angular/core';
import { TableComponent } from "../../components/table/table.component";
import { Region } from '../../interfaces/region.type';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { ActivatedRoute, Router } from '@angular/router';



function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam?.toLowerCase();
  const validRegions: Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? '';
}



@Component({
  selector: 'app-by-region-page',
  imports: [TableComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);
  countries = signal<Country[]>([]);
  error = signal<string | null>(null);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  // queryParam = this.activatedRoute.snapshot.queryParamMap.get('query');
  // selectedRegion = linkedSignal<string | null>(() => validateQueryParam(this.queryParam!));
  selectedRegion = signal<Region | null>(null);

  isLoading = signal(false);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  constructor() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const region = validateQueryParam(params.get('query')!);
      this.selectedRegion.set(region);
      if (region) {
        this.onRegionSelected(region);
      }
    });
  }

  onRegionSelected(region: Region) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.error.set(null);
    this.selectedRegion.set(region);
    this.countryService.searchByRegion(region).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
        this.router.navigate(['/country/by-region'], {
          queryParams: { query: region },
        })
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.error.set(err);
      },
    })
  }
}
