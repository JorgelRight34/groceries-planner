import { Injectable, signal } from '@angular/core';
import { Grocery } from '../models/grocery';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
  groceries: Grocery[] = [...JSON.parse(localStorage.getItem("groceries") || "[]")];
  groceriesHistory: Grocery[] = [];
  currentDay = signal("Monday");

  constructor() { }

  getGroceriesByDay() {
    if (!this.currentDay()) return this.groceries;

    return this.groceries.filter(
      grocery => grocery.days.includes(this.currentDay())
    ) || []
  }

  getGroceriesByDayAndCategory(categoryId: number) {
    return this.getGroceriesByDay().filter(
      grocery => grocery.category?.id === categoryId
    );
  }

  addGrocery(grocery: Grocery): void {
    let day = this.currentDay();
    // Check if a grocery with the same name already exists
    const existingGrocery = this.groceries.filter(
      g => g.name === grocery.name
    )[0];


    // If already what exists is added to current day then return
    if (existingGrocery.days.includes(day)) return

    if (existingGrocery) {
      // If existing grocery but doesn't include day then include it
      this.groceries.push({
        ...existingGrocery,
        days: [...existingGrocery.days, day]
      })
    } else {
      // If there's not existin grocery create it from scratch
      this.groceries.push({
        ...grocery,
        days: [this.currentDay()],
        id: Math.random()
      });
    }

    localStorage.setItem("groceries", JSON.stringify(this.groceries))
  }

  deleteGrocery(groceryId: number): void {
    const filteredArray = this.groceries.filter(
      grocery => grocery.id !== groceryId
    );

    this.groceriesHistory = [...filteredArray]  // Save all what was once saved
    this.groceries = filteredArray; // Delete from the current list
  }
}
