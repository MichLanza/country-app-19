import { CountryResponse } from '../interfaces/country-response.interface';
import { Country } from "../interfaces/country.interface";

export class CountryMapper {


  static mapCountryResponseToCountry(countryResponse: CountryResponse): Country {
    return {
      cca2: countryResponse.cca2,
      flag: countryResponse.flag,
      flagSvg: countryResponse.flags.svg,
      name: countryResponse.translations['spa'].common ?? 'No Name',
      capital: countryResponse.capital.join(','),
      population: countryResponse.population
    }
  }

  static mapResponseArrayToCountryArray(responseCountryArray: CountryResponse[]): Country[] {
    return responseCountryArray.map(this.mapCountryResponseToCountry);
  }

}
