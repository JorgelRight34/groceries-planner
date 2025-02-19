import { Component, EventEmitter, output, signal } from '@angular/core';
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

  constructor() {}

  handleSelectDay(day: string) {
    this.selectDay.emit(day);
    this.selectedDay.set(day);
  }

}
