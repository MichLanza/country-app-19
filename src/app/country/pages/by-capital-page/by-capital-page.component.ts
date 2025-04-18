import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableComponent } from "../../components/table/table.component";
import { CountryService } from '../../services/country.service';
import type { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, TableComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  //EXPERIMENTAL 19
  // query = signal('');

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     const { query } = request;
  //     if (!query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(query)
  //     );
  //   }
  // })

  isLoading = signal(false);
  error = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {

    if (!query) return;

    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);


    this.countryService.searchByCapital(query).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.error.set(err);
      },
    });

  }

}
