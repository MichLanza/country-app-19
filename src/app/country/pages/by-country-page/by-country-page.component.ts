import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, TableComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  onSearch(value: string){
    console.log(value);
  }
}
