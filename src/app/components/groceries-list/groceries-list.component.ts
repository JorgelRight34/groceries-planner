import { Component, input } from '@angular/core';
import { categories } from '../../../lib/constants';
import { GroceriesService } from '../../services/groceries.service';
import { Grocery } from '../../models/grocery';

@Component({
  selector: 'app-groceries-list',
  imports: [],
  templateUrl: './groceries-list.component.html',
  styleUrl: './groceries-list.component.css'
})
export class GroceriesListComponent {
  categories = [...categories];
  categoriesHalf = Math.round(this.categories.length / 2);
  startCategories = this.categories.slice(0, this.categoriesHalf);
  endCategories = this.categories.slice(this.categoriesHalf);

  constructor(private groceriesService: GroceriesService) { }

  getCategoryGroceries(category: number): Grocery[] {
    return this.groceriesService.getGroceriesByDayAndCategory(category);
  }

  getDay(): string {
    return this.groceriesService.currentDay();
  }
}
