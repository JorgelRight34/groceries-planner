import { Component, input, signal } from '@angular/core';
import { GroceriesService } from '../../services/groceries.service';
import { Grocery } from '../../models/grocery';
import { DaySelectorComponent } from '../day-selector/day-selector.component';
import { CategoriesComponent } from '../categories/categories.component';
import { GroceryComponent } from '../grocery/grocery.component';
import { GroceryListComponent } from '../grocery-list/grocery-list.component';

@Component({
  selector: 'app-groceries',
  imports: [
    DaySelectorComponent, 
    CategoriesComponent, 
    GroceryComponent, 
    GroceryListComponent
  ],
  templateUrl: './groceries.component.html',
  styleUrl: './groceries.component.css'
})
export class GroceriesComponent {
  day = signal('monday');
  groceries: Grocery[] = [];

  constructor(private groceriesService: GroceriesService) {}

  selectDay(day: string) {
    this.day.set(day);
    this.groceries = this.groceriesService.getGroceriesByDay(this.day());
  } 
}
