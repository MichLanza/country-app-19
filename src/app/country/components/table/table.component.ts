import { Component, input } from '@angular/core';
import type { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {


  countries = input.required<Country[]>();

  errorMessage = input<string | unknown | undefined | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

}
