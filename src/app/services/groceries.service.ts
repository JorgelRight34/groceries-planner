import { Injectable, signal } from '@angular/core';
import { Grocery } from '../models/grocery';
import { groceries } from '../../lib/constants';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  groceries: Grocery[] = [...groceries];

  constructor() { }

  getGroceriesByDay(day?: string) {
    if (!day) return this.groceries;
    return this.groceries.filter(grocery => grocery.days.includes(day)) || []
  }

  getGroceriesByDayAndCategory(day: string, categoryId: number) {
    return this.getGroceriesByDay(day).filter(grocery => grocery.category?.id === categoryId);
  }

  addGrocery(grocery: Grocery): void {
    this.groceries.push(grocery);
  }

  deleteGrocery(groceryId: number): void {
    const filteredArray = this.groceries.filter(
      grocery => grocery.id !== groceryId
    );
    this.groceries = filteredArray;
  }
}
