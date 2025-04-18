import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";

@Component({
  selector: 'country-laoyout',
  imports: [RouterOutlet, TopMenuComponent],
  templateUrl: './country-laoyout.component.html',
  styleUrl: './country-laoyout.component.css'
})
export class CountryLaoyoutComponent {

}
