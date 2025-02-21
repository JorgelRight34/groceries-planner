import { Component, computed, signal } from '@angular/core';
import { DaySelectorComponent } from '../../components/day-selector/day-selector.component';
import { GroceriesComponent } from '../../components/groceries/groceries.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { GroceryComponent } from '../../components/grocery/grocery.component';
import { GroceriesListComponent } from '../../components/groceries-list/groceries-list.component';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-home',
  imports: [GroceriesComponent, DaySelectorComponent, CategoriesComponent, GroceriesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentCategory = signal<string>('');
  groceries = computed(
    () => this.groceriesService.getGroceriesByDay()
  )

  constructor(private groceriesService: GroceriesService) { }

  selectDay(day: string): void {
    this.groceriesService.currentDay.set(day);
  }

  getGroceriesForDay() {
    let result = this.groceriesService.getGroceriesByDay();
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
