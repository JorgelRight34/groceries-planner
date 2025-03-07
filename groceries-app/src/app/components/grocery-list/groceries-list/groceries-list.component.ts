import { Component, computed, signal } from '@angular/core';
import { GroceriesService } from '../../../services/groceries.service';
import { Grocery } from '../../../models/grocery';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';
import { HighlightInputDirective } from '../../../directives/highlight-input.directive';
import { Day } from '../../../models/day';

@Component({
  selector: 'app-groceries-list',
  imports: [CommonModule, HighlightInputDirective],
  templateUrl: './groceries-list.component.html',
  styleUrl: './groceries-list.component.css'
})
export class GroceriesListComponent {
  categories = computed(() => this.categoriesService.categories());
  categoriesHalf = computed(  // Half to get the left and right halves
    () => Math.round(this.categories().length / 2)
  );
  startCategories = computed( // Right half ot categories
    () => this.categories().slice(0, this.categoriesHalf())
  );
  endCategories = computed( // Left half of categories
    () => this.categories().slice(this.categoriesHalf())
  );
  checkedGroceries = signal<Record<number, boolean>>({}); // Checked groceries
  totalCheckedPrice = signal<number>(0);  // Total price of the sum of the price of checked groceries
  day = computed<Day>(() => this.groceriesService.currentDay())

  constructor(
    private groceriesService: GroceriesService,
    private categoriesService: CategoriesService
  ) { }

  getCategoryGroceries(category: number): Grocery[] | undefined {
    return this.groceriesService.getGroceriesByDayAndCategory(category);
  }

  onGroceryChange(grocery: Grocery) {
    // Check if grocery is already checked
    const checked = this.checkedGroceries()[grocery.id]
    const multiplier = checked ? -1 : 1;

    // Update total price
    this.totalCheckedPrice.update(
      prev => prev + grocery.cost * grocery[this.day()] * multiplier
    );

    if (checked) {
      this.checkedGroceries.update(prev => ({ ...prev, [grocery.id]: false }));
      return;
    }

    // Update checked groceries
    this.checkedGroceries.update(prev => {
      if (prev) {
        return {
          ...prev,
          [grocery.id]: true
        }
      }
      return prev;
    });
  }
}
