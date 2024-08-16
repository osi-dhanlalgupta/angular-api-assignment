import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    InputTextModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() placeholder: string = 'Search...';
  @Output() search = new EventEmitter<string>();

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.search.emit(inputElement.value);
    }
  }
}
