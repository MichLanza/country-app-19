import { Component, inject, linkedSignal, resource, signal, } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableComponent } from "../../components/table/table.component";
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, TableComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  //! Forma experimental de angular 19
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';
  query = linkedSignal(() => this.queryParam);
  countryService = inject(CountryService);

  // promise
  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async ({ request }) => {
  //     const { query } = request;
  //     if (!query) return [];
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(query)
  //     );
  //   }
  // });

  //observable
  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-country'],{
        queryParams: { query: request.query },
      })
      return this.countryService.searchByCountry(request.query);
    }
  });
}
