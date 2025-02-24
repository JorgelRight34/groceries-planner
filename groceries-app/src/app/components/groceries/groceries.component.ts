import { Component, computed, input, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { GroceryComponent } from '../grocery/grocery.component';
import { Day } from "../../models/day"

@Component({
  selector: 'app-groceries',
  imports: [GroceryComponent],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css'
})
export class GroceriesComponent {
  currentCategory = input<string>('');

  constructor(public groceriesService: GroceriesService) { }

  getGroceriesForDay() {
    // Get all the groceries for the currrent day and category
    let result = this.groceriesService.getGroceriesByDay();
    console.log("result", result);
    if (this.currentCategory()) {
      result = result.filter(
        // Only select the groceries belongig to category
        grocery => grocery.category?.name === this.currentCategory()
      );
    }

    console.log("filter", result);
    return result;
  }
}
