import { inject, Injectable, signal } from '@angular/core';
import { Grocery } from '../models/grocery';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  private url = `https://localhost:7240`;
  private http = inject(HttpClient);
  groceries = signal<Array<Grocery>>([]);
  groceriesHistory: Grocery[] = []; // All groceries that have been created
  currentDay = signal("Monday");  // Current selected day for grocery list

  constructor() {
    this.getAllGroceries();
  }

  getAllGroceries() {
    if (this.groceries.length) {
      return this.groceries;
    }
    return this.http.get<Array<Grocery>>(`${this.url}/groceries`).
      subscribe((data) => {
        this.groceries.set(data);
      });
  }

  getGroceriesByDay() {
    // Get all groceries of the selected day (currentDay)
    if (!this.currentDay()) return this.groceries();

    return this.groceries().filter(
      grocery => true //temporary
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
    // Add grocery to localStorage
    let day = this.currentDay();  // Current day
    // Check if a grocery with the same name already exists
    const existingGrocery = this.groceries().filter(
      g => g.name === grocery.name
    )[0];

    // If already what exists is added to current day then return
    if (existingGrocery.days.includes(day)) return

    if (existingGrocery) {
      // If existing grocery but doesn't include day then include it
      this.groceries.set(this.groceries().map((g) => {
        if (g.id === existingGrocery.id) {
          return {
            ...existingGrocery,
            days: [...existingGrocery.days, day]
          }
        }
        return g
      }));
    } else {
      // If there's not existin grocery create it from scratch
      this.groceries.update(prev => [...prev, {
        ...grocery,
        days: [this.currentDay()],
        id: Math.random()
      }]);
    }

    // Save on localStorage the state of the app
    localStorage.setItem("groceries", JSON.stringify(this.groceries))
  }

  deleteGrocery(groceryId: number): void {
    // Delete grocery from history and localStorage
    const filteredArray = this.groceries().map((g) => {
      if (g.id === groceryId) {
        return { ...g, days: [...g.days.filter(day => day != this.currentDay())] }
      }
      return g
    }
    );


    this.groceries.set(filteredArray); // Delete from the current list
    localStorage.setItem("groceries", JSON.stringify(this.groceries)) // Delete from local
  }
}
