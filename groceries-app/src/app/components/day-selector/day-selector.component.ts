import { Component, signal } from '@angular/core';
import { days } from '../../../lib/constants';
import { CommonModule } from '@angular/common';
import { Day } from '../../models/day';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-day-selector',
  imports: [CommonModule],
  templateUrl: './day-selector.component.html',
  styleUrl: './day-selector.component.css'
})
export class DaySelectorComponent {
  days: string[] = [...days]
  currentDay = signal<string>('');

  constructor(private groceriesService: GroceriesService) { }

  ngOnInit() {
    this.currentDay.set(this.groceriesService.currentDay());
  };

  handleSelectDay(day: string) {
    const dayToDayType = day.toLocaleLowerCase() as Day;
    this.groceriesService.currentDay.set(dayToDayType);
    this.currentDay.set(dayToDayType);
  }

  handleOnChange(event: Event) {
    const day = (event.target as HTMLSelectElement).value;
    this.handleSelectDay(day);
  }
}
