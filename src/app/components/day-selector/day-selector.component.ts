import { Component, EventEmitter, output, signal } from '@angular/core';
import { days } from '../../../lib/constants';
import { CommonModule } from '@angular/common';
import { AddGroceryButtonComponent } from '../add-grocery-button/add-grocery-button.component';
import { AddGroceryComponent } from "../add-grocery/add-grocery.component";

@Component({
  selector: 'app-day-selector',
  imports: [CommonModule, AddGroceryButtonComponent],
  templateUrl: './day-selector.component.html',
  styleUrl: './day-selector.component.css'
})
export class DaySelectorComponent {
  days: string[] = [...days]
  selectDay = output<string>();
  selectedDay = signal('Monday');

  handleSelectDay(day: string) {
    this.selectDay.emit(day);
    this.selectedDay.set(day);
  }

}
