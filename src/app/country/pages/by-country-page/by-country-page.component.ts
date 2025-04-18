import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableComponent } from "../../components/table/table.component";
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, TableComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  //! Forma experimental de angular 19
  query = signal('');
  countryService = inject(CountryService);

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      const { query } = request;
      if (!query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(query)
      );
    }
  })
}
