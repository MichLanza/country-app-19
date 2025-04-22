import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {

  initialValue = input<string>('');

  placeHolder = input('Buscar');
  searchValue = output<string>();
  inputValue = linkedSignal<string>(() =>this.initialValue()??'');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.searchValue.emit(value);
    }, 750);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

}
