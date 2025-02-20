import { Component, computed, input, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { DaySelectorComponent } from '../day-selector/day-selector.component';
import { CategoriesComponent } from '../categories/categories.component';
import { GroceryComponent } from '../grocery/grocery.component';
import { GroceriesListComponent } from '../groceries-list/groceries-list.component';

@Component({
  selector: 'app-groceries',
  imports: [
    DaySelectorComponent, CategoriesComponent, GroceryComponent, GroceriesListComponent
  ],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css'
})
export class GroceriesComponent {
  day = signal('Monday');
  currentCategory = signal<string>('');
  groceries = computed(
    () => this.groceriesService.getGroceriesByDay(this.day())
  )

  constructor(private groceriesService: GroceriesService) { }

  selectDay(day: string): void {
    this.day.set(day);
  }

  getGroceriesForDay() {
    let result = this.groceriesService.getGroceriesByDay(this.day());
    if (this.currentCategory()) {
      result = result.filter(
        grocery => grocery.category?.name === this.currentCategory()
      );
    }
    return result;
  }

  changeCategory(category: string): void {
    this.currentCategory.set(category)
  }
}
