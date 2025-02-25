import { Component, computed, input, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { GroceryComponent } from '../grocery/grocery.component';
import { Day } from "../../models/day"
import { CategoriesService } from '../../services/categories.service';
import { Grocery } from '../../models/grocery';

@Component({
  selector: 'app-groceries',
  imports: [GroceryComponent],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css'
})
export class GroceriesComponent {
  groceries = computed(() => this.getGroceriesForDay());

  constructor(private groceriesService: GroceriesService, private categoriesService: CategoriesService) { }

  getGroceriesForDay() {
    const currentCategory = this.categoriesService.currentCategory();
    // Get all the groceries for the currrent day and category
    let result = this.groceriesService.getGroceriesByDay();
    if (currentCategory) {
      result = result.filter(
        // Only select the groceries belonging to category
        grocery => grocery.category?.id === currentCategory.id
      );
    }
    return result;
  }
}
