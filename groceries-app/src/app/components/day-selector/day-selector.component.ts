import { Component, output, signal } from '@angular/core';
import { days } from '../../../lib/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-selector',
  imports: [CommonModule],
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

  handleOnChange(event: Event) {
    const day = (event.target as HTMLSelectElement).value;
    this.handleSelectDay(day);
  }
}
