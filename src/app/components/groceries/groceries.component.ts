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
  groceries = computed(
    () => this.groceriesService.groceries
  )

  constructor(private groceriesService: GroceriesService) { }

  getGroceriesForDay() {
    let result = this.groceriesService.getGroceriesByDay();
    if (this.currentCategory()) {
      result = result.filter(
        grocery => grocery.category?.name === this.currentCategory()
      );
    }
    return result;
  }
}
