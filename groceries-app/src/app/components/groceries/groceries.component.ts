import { Component, computed, input, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { GroceryComponent } from '../grocery/grocery.component';
import { Day } from "../../models/day"
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-groceries',
  imports: [GroceryComponent],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css'
})
export class GroceriesComponent {
  currentCategory = input<string>('');

  constructor(private groceriesService: GroceriesService, private categoriesService: CategoriesService) { }

  getGroceriesForDay() {
    // Get all the groceries for the currrent day and category
    let result = this.groceriesService.getGroceriesByDay();
    if (this.currentCategory()) {
      result = result.filter(
        // Only select the groceries belonging to category
        grocery => grocery.category?.id === this.categoriesService.currentCategory()?.id
      );
    }
    return result;
  }
}
