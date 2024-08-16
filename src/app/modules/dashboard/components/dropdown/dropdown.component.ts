import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  @Input() options: { name: string, code: number }[] = [];
  @Input() selectedOption!: { name: string, code: number } ;
  @Input() placeholder: string = 'Select an option';
  @Output() onOptionSelect: EventEmitter<number> = new EventEmitter<number>();

  onSelect(event: any) {
    this.onOptionSelect.emit(event.value.code);
  }
}
