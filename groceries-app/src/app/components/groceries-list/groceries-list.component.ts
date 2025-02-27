import { Component, computed } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { Grocery } from '../../models/grocery';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-groceries-list',
  imports: [CommonModule],
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

  constructor(
    private groceriesService: GroceriesService,
    private categoriesService: CategoriesService
  ) { }

  getCategoryGroceries(category: number): Grocery[] | undefined {
    return this.groceriesService.getGroceriesByDayAndCategory(category);
  }

  getDay(): string {
    return this.groceriesService.currentDay();
  }
}
