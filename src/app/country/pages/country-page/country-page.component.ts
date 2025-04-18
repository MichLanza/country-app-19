import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {


  countryService = inject(CountryService);

  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResource = rxResource(
    {
      request: () => ({ code: this.countryCode }),
      loader: ({ request }) => {
        return this.countryService.searchCountryByCode(request.code);
      }
    });

}
