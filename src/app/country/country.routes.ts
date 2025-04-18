import { Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { CountryLaoyoutComponent } from './layouts/country-laoyout/country-laoyout.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

export const countryroutes: Routes = [
  {
    path: '',
    component: CountryLaoyoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent,
      },
      {
        path: 'by-country',
        component: ByCountryPageComponent,
      },
      {
        path: 'by-region',
        component: ByRegionPageComponent,
      },
      {
        path: 'by/:code',
        component: CountryPageComponent,
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }

];

export default countryroutes;
