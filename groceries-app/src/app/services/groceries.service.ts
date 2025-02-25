import { inject, Injectable, signal } from '@angular/core';
import { Grocery } from '../models/grocery';
import { HttpClient } from '@angular/common/http';
import { Day } from '../models/day';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  private url = `https://localhost:7240/groceries`;
  private http = inject(HttpClient);
  groceries = signal<Array<Grocery>>([]);
  groceriesHistory: Grocery[] = []; // All groceries that have been created
  currentDay = signal<Day>("monday");  // Current selected day for grocery list

  constructor() {
    this.getAllGroceries();
  }

  getAllGroceries() {
    if (this.groceries.length) {
      return this.groceries;
    }

    return this.http.get<Array<Grocery>>(`${this.url}`).
      subscribe((data) => {
        this.groceries.set(data);
      });
  }

  getGroceriesByDay() {
    // Get all groceries of the selected day (currentDay)
    const day = this.currentDay();

    if (!day) return this.groceries();

    return this.groceries().filter(
      grocery => grocery[day] > 0
    ) || []
  }

  getGroceriesByDayAndCategory(categoryId: number) {
    // Get all the groceries of the selected day (currentDay)
    // that have as category the corresponding category to categoryId
    return this.getGroceriesByDay().filter(
      grocery => grocery.category?.id === categoryId
    );
  }

  addGrocery(grocery: Grocery): void {
    // Add grocery t
    let day = this.currentDay();  // Current day
    // Check if a grocery with the same name already exists
    const existingGrocery = this.groceries().filter(
      g => g.name === grocery.name
    )[0];

    if (existingGrocery) {
      // If existing grocery add one to the day it's being added
      const copy = [...this.groceries()];
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      copy[index] = { ...grocery, [day]: grocery[day] + 1 };

      this.groceries.set(copy);
    } else {
      // If there's not existing grocery create it from scratch
      this.http.post<Grocery>(`${this.url}`, {
        ...grocery,
        [day]: 1,
      }).
        subscribe((data) => {
          // Add new grocery to the groceries array
          this.groceries.update(prev => [...prev, data])
        });
    }
  }

  substractOneGrocery(grocery: Grocery): void {
    // Add grocery t
    let day = this.currentDay();  // Current day
    // Check if a grocery with the same name already exists
    const existingGrocery = this.groceries().filter(
      g => g.id === grocery.id
    )[0];

    if (existingGrocery) {
      // If existing grocery add one to the day it's being added
      const copy = [...this.groceries()];
      const index = copy.findIndex((g) => g.id === existingGrocery.id);
      const substraction = grocery[day] - 1;
      copy[index] = { ...grocery, [day]: substraction < 0 ? 0 : substraction };
      this.groceries.set(copy);
      return
    }
  }

  saveGroceryList(): Observable<Grocery[]> {
    return this.http.post<Grocery[]>(`${this.url}/save-groceries-list`, this.groceries());
  }

  deleteGrocery(groceryId: number): void {
    // 
  }
}
