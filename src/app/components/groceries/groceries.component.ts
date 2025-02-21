import { Component, computed, input, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { GroceryComponent } from '../grocery/grocery.component';

@Component({
  selector: 'app-groceries',
  imports: [GroceryComponent],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css'
})
export class GroceriesComponent {
  currentCategory = input<string>('');

  constructor(private groceriesService: GroceriesService) { }

  getGroceriesForDay() {
    // Get all the groceries for the currrent day and category
    let result = this.groceriesService.getGroceriesByDay();
    if (this.currentCategory()) {
      result = result.filter(
        // Only select the groceries belongig to category
        grocery => grocery.category?.name === this.currentCategory()
      );
    }
    return result;
  }
}
